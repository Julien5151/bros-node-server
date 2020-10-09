import { RequestHandler } from "express";
import { UserRole } from "../../utils/types/enums";
import { CustomError } from "../../utils/types/interfaces";
import { SignupRequest, SignupResponse } from "./signup.types";
import bcrypt from "bcryptjs";
import { SqlQueries } from "../../utils/database/sql-queries";

export const signupRouteController: RequestHandler = async (req, res, next) => {
    // Extract data from body
    const reqBody = req.body as SignupRequest;
    // Check if passwords match
    if (reqBody.password === reqBody.confirmedPassword) {
        // Create new user object (visitor at signup)
        const newUser = {
            email: reqBody.email,
            role: UserRole.visitor,
            createdAt: new Date(),
        };
        try {
            // Hash password using bcrypt
            const hashedPassword = await bcrypt.hash(reqBody.password, 12);
            await SqlQueries.insertInto("users", ["email", "password", "role", "created_at"], [newUser.email, hashedPassword, newUser.role, newUser.createdAt]);
            // Create response object
            const response: SignupResponse = {
                message: "Signup successfull",
            };
            return res.status(201).json(response);
        } catch (err) {
            // Create custom error message from mysql error
            const error: CustomError = {
                statusCode: 500,
                message: err.message,
            };
            // Pass error to error handler middleware
            return next(error);
        }
    } else {
        // If passwords don't match, send 400 error
        const error: CustomError = {
            statusCode: 400,
            message: "Passwords don't match",
        };
        // Pass error to error handler middleware
        return next(error);
    }
};
