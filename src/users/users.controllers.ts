import { RequestHandler } from "express";
import { MysqlError } from "mysql2";
import { connectionPool } from "../utils/database/connectionPool";
import { CustomError, User } from "../utils/types/interfaces";

export const postUsersRouteController: RequestHandler = (req, res, next) => {
    // Extract user from body
    const reqBody = req.body as User;
    // Create new user object
    const newUser: User = req.body;
    // Created now
    newUser["createdAt"] = new Date();
    // Insert user into table
    connectionPool
        .execute(
            "INSERT INTO users (first_name, last_name, email, phone, zipcode, password, role, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
            [
                newUser.firstName,
                newUser.lastName,
                newUser.email,
                newUser.phone,
                newUser.zipcode,
                newUser.password,
                newUser.role,
                newUser.createdAt,
            ]
        )
        .then((response: any) => {
            // Return created user with its id
            const createdUser = { ...newUser, id: response[0].insertId };
            return res.status(201).json(createdUser);
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

export const deleteUsersRouteController: RequestHandler = (req, res, next) => {
    // Extract user id from request
    const userId = req.params.id;
    // Delete user from table
    connectionPool
        .execute("DELETE FROM users WHERE id = ?;", [userId])
        .then((response: any) => {
            // Return created user with its id
            return res
                .status(200)
                .json({ message: `${response[0].affectedRows} users deleted` });
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
