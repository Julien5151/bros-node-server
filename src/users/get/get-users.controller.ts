import { RequestHandler } from "express";
import { SqlQueries } from "../../utils/database/sql-queries";
import { User } from "../../models/user";
import { GetUsersResponse } from "./get-users.types";
import { CustomError } from "../../utils/types/interfaces";

export const getUsersRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Select fields to extract
    const fieldToExtract = [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone",
        "address",
        "zipcode",
        "created_at",
    ];
    try {
        // Extract rows from DB
        const [rows] = await SqlQueries.selectFrom("users", fieldToExtract);
        // Cast and return the response
        const response: GetUsersResponse = rows as Array<User>;
        return res.status(200).json(response);
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
