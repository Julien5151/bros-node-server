import { RequestHandler } from "express";
import { CustomError } from "../../utils/types/interfaces";
import { db } from "../../utils/database/db-connection";
import { MongoCollection } from "../../utils/types/enums";
import { User } from "../../models/user";

export const getUsersRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        // Extract data from DB
        const usersData = await db
            .collection(MongoCollection.users)
            .find()
            .toArray();
        // Create user plain objects array based on data
        const users: Array<User> = usersData.map((userData) =>
            new User(userData).getPlainObject()
        );
        return res.status(200).json(users);
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
