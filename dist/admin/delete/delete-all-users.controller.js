"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllUsersRouteController = void 0;
const user_1 = require("../../models/user");
const deleteAllUsersRouteController = async (req, res, next) => {
    try {
        // Remove all user documents
        const deleteAllResponse = await user_1.User.deleteAll();
        // Users can't be locked at the moment
        // To be refactored when they will be included in groups
        const deleteResponse = {
            deleted: deleteAllResponse.deletedCount ?? 0,
            locked: 0,
        };
        return res.status(200).json(deleteResponse);
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
exports.deleteAllUsersRouteController = deleteAllUsersRouteController;
