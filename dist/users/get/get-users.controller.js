"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersRouteController = void 0;
const db_connection_1 = require("../../utils/database/db-connection");
const enums_1 = require("../../utils/types/enums");
const user_1 = require("../../models/user");
const getUsersRouteController = async (req, res, next) => {
    try {
        // Extract data from DB
        const usersData = await db_connection_1.db
            .collection(enums_1.MongoCollection.users)
            .find()
            .toArray();
        // Create user plain objects array based on data
        const users = usersData.map((userData) => new user_1.User(userData).getPlainObject());
        return res.status(200).json(users);
    }
    catch (error) {
        // In case of DB error, log the error
        console.error(error.message);
        // Return a generic message to client
        const customError = {
            statusCode: 500,
            message: "Something went wrong",
        };
        return next(customError);
    }
};
exports.getUsersRouteController = getUsersRouteController;
