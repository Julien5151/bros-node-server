"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsersRouteController = exports.postUsersRouteController = void 0;
const connectionPool_1 = require("../utils/database/connectionPool");
exports.postUsersRouteController = (req, res, next) => {
    // Extract user from body
    const reqBody = req.body;
    // Create new user object
    const newUser = req.body;
    // Created now
    newUser["createdAt"] = new Date();
    // Insert user into table
    connectionPool_1.connectionPool
        .execute("INSERT INTO users (first_name, last_name, email, phone, zipcode, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [
        newUser.firstName,
        newUser.lastName,
        newUser.email,
        newUser.phone,
        newUser.zipcode,
        newUser.password,
        newUser.role,
        newUser.createdAt,
    ])
        .then((response) => {
        // Return created user with its id
        const createdUser = Object.assign(Object.assign({}, newUser), { id: response[0].insertId });
        return res.status(201).json(createdUser);
    })
        .catch((mysqlError) => {
        // Create custom error message from mysql error
        const error = {
            statusCode: 500,
            message: mysqlError.message,
        };
        // Pass error to error handler middleware
        next(error);
    });
};
exports.deleteUsersRouteController = (req, res, next) => {
    // Extract user id from request
    const userId = req.params.id;
    // Delete user from table
    connectionPool_1.connectionPool
        .execute("DELETE FROM users WHERE id = ?;", [userId])
        .then((response) => {
        // Return created user with its id
        return res
            .status(200)
            .json({ message: `${response[0].affectedRows} users deleted` });
    })
        .catch((mysqlError) => {
        // Create custom error message from mysql error
        const error = {
            statusCode: 500,
            message: mysqlError.message,
        };
        // Pass error to error handler middleware
        next(error);
    });
};
