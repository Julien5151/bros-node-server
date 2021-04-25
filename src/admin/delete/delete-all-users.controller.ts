import { RequestHandler } from "express";
import { User } from "../../models/user";
import { UserDeleteResponse } from "../../users/delete/delete-user.types";
import { CustomError } from "../../utils/types/interfaces";

export const deleteAllUsersRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        // Remove all user documents
        const deleteAllResponse = await User.deleteAll();
        // Users can't be locked at the moment
        // To be refactored when they will be included in groups
        const deleteResponse: UserDeleteResponse = {
            deleted: deleteAllResponse.deletedCount ?? 0,
            locked: 0,
        };
        return res.status(200).json(deleteResponse);
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
