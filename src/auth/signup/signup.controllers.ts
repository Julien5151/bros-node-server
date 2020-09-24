import { RequestHandler } from "express";
import { MysqlError, OkPacket } from "mysql2";
import { User } from "../../models/user";
import { connectionPool } from "../../utils/database/connectionPool";
import { UserRole } from "../../utils/types/enums";
import { CustomError } from "../../utils/types/interfaces";
import { SignupRequest, SignupResponse } from "./signup.types";
import bcrypt from "bcryptjs";

export const signupRouteController: RequestHandler = (req, res, next) => {
    // Extract data from body
    const reqBody = req.body as SignupRequest;
    // Create new user object (visitor at signup)
    const newUser: User = {
        email: reqBody.email,
        role: UserRole.visitor,
        createdAt: new Date(),
    };
    // Hash password using bcrypt
    bcrypt
        .hash(reqBody.password, 12)
        .then((hashedPassword) => {
            return connectionPool.execute(
                "INSERT INTO users (email, password, role, created_at) VALUES (?, ?, ?, ?);",
                [newUser.email, hashedPassword, newUser.role, newUser.createdAt]
            );
        })
        .then((mysqlResponse: OkPacket[] | any) => {
            // Create response object
            const response: SignupResponse = {
                message: "Signup successfull",
            };
            return res.status(201).json(response);
        })
        .catch((err: MysqlError) => {
            // Create custom error message from mysql error
            const error: CustomError = {
                statusCode: 500,
                message: err.message,
            };
            // Pass error to error handler middleware
            next(error);
        });
};
