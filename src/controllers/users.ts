import { RequestHandler } from "express";
import { MysqlError } from "mysql2";
import { connectionPool } from "../utils/database";
import { CustomError, User } from "../utils/interfaces";

export const postUsersRouteController: RequestHandler = (req, res, next) => {
    // Extract user from body
    const reqBody = req.body as User;
    // Insert user into table
    connectionPool
        .execute(
            "INSERT INTO users (first_name, last_name, email, phone, zipcode, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
            [
                reqBody.firstName,
                reqBody.lastName,
                reqBody.email,
                reqBody.phone,
                reqBody.zipcode,
                reqBody.password,
                reqBody.role,
                new Date(),
            ]
        )
        .then((response) => {
            return res
                .status(201)
                .json({ message: "User created successfully" });
        })
        .catch((mysqlError: MysqlError) => {
            // Create custom error message from mysql error
            const error: CustomError = {
                statusCode: 500,
                message: mysqlError.message,
            };
            // Pass error to error handler middleware
            next(error);
        });
};
