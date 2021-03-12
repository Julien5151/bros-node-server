import { RequestHandler } from "express";
import { User } from "../../models/user";
import { CustomError } from "../../utils/types/interfaces";
import { UserDeleteResponse } from "./delete-user.types";

export const deleteUserRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract user id from params
    const userId = req.params["id"];
    try {
        // Delete user from DB using its _id
        const deletionResponse = await User.delete(userId);
        // Users can't be locked at the moment
        // To be refactored when they will be included in groups
        const deleteResponse: UserDeleteResponse = {
            deleted: deletionResponse.deletedCount ?? 0,
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
