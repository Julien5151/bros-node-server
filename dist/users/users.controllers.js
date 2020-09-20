"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postUsersRouteController = void 0;
const connectionPool_1 = require("../utils/database/connectionPool");
exports.postUsersRouteController = (req, res, next) => {
    // Extract user from body
    const reqBody = req.body;
    // Insert user into table
    connectionPool_1.connectionPool
        .execute("INSERT INTO users (first_name, last_name, email, phone, zipcode, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);", [
        reqBody.firstName,
        reqBody.lastName,
        reqBody.email,
        reqBody.phone,
        reqBody.zipcode,
        reqBody.password,
        reqBody.role,
        new Date(),
    ])
        .then((response) => {
        return res
            .status(201)
            .json({ message: "User created successfully" });
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
