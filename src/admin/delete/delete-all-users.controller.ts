import { RequestHandler } from "express";
import { UserDeleteResponse } from "../../users/delete/delete-user.types";
import { SqlQueries } from "../../utils/database/sql-queries";
import { CustomError } from "../../utils/types/interfaces";

export const deleteAllUsersRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        const [rows] = await SqlQueries.deleteFrom("users");
        // Users can't be locked at the moment
        // To be refactored when they will be included in groups
        const deleteResponse: UserDeleteResponse = {
            deleted: rows.affectedRows,
            locked: 0,
        };
        return res.status(200).json(deleteResponse);
    } catch (error) {
        // In case of SQL error, log the error
        console.error(error.message);
        // Return a generic message to client
        const customError: CustomError = {
            statusCode: 500,
            message: "Something went wrong",
        };
        return next(customError);
    }
};
