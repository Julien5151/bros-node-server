import { RequestHandler } from "express";
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
    // Start composing the group
    try {
        const userList = await User.findRandomSample(
            GroupSize[groupType],
            user.zipcode
        );
        const finalList = userList.map((user) => user.getPlainObject());
        // Fetch all group data from both user and friend_groups tables
        return res.status(200).json({ userList: finalList });
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
