import { RequestHandler } from "express";
import { Group } from "../../models/group";
import { User } from "../../models/user";
import { GroupType, GroupSize } from "../../utils/types/enums";
import { CustomError } from "../../utils/types/interfaces";
import { GroupPostRequest } from "./post-group.types";

export const postGroupRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body
    const reqBody = req.body as GroupPostRequest;
    try {
        // Fetch all group data from both user and friend_groups tables
        return res.status(200).json({ message: "You group was created" });
    } catch (error) {
        // In case of DB error, log the error
        console.error(error.message);
        // Return a generic message to client
        const customError: CustomError = {
            statusCode: 500,
            message: "Something went wrong",
        };
        return next(customError);
    }
};
