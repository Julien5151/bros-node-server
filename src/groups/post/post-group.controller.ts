import { RequestHandler } from "express";
import { Group } from "../../models/group";
import { User } from "../../models/user";
import { GroupSize } from "../../utils/types/enums";
import { CustomError } from "../../utils/types/interfaces";
import { GroupPostRequest } from "./post-group.types";

export const postGroupRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract group type
    const groupType = (req.body as GroupPostRequest).type;
    // Extract user initiating group request
    const user = res.locals.user as User;
    // Check that it's a real user, not dev admin
    if (!user) {
        const customError: CustomError = {
            statusCode: 400,
            message: "Groups must be created using a real user",
        };
        return next(customError);
    }
    // If user is already grouped, can't create another group
    if (user.groupId) {
        const customError: CustomError = {
            statusCode: 403,
            message:
                "User already in a group. Must leave current group before joining a new one",
        };
        return next(customError);
    }
    // Start composing the group
    try {
        const brosList = await User.findRandomSample(
            GroupSize[groupType] - 1,
            user.zipcode,
            user._id
        );
        // Instanciate new group
        const brosGroup = new Group({
            type: groupType,
            zipcode: user.zipcode,
        });
        // If group creation is successfull, mark all users as grouped
        // and no longer available for grouping
        const completeBrosList = [user, ...brosList];
        // List
        const completeBrosListIds = completeBrosList.map((user) => user._id);
        await User.updateMany(completeBrosListIds, {
            $set: {
                groupId: brosGroup._id,
                availableForGrouping: false,
            },
        });
        // Insert new group in DB
        await brosGroup.create();
        // If group successfully created, return the created group
        return res.status(201).json(brosGroup.getPlainObject());
    } catch (error) {
        // If not enough user found, return 404 error
        if (error.statusCode === 404) {
            next(error);
        } else {
            // Other case of DB error, log the error
            console.error(error.message);
            // Return a generic message to client
            const customError: CustomError = {
                statusCode: 500,
                message: "Something went wrong",
            };
            return next(customError);
        }
    }
};
