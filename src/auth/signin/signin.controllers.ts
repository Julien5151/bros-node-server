import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../../models/user";
import { connectionPool } from "../../utils/database/connectionPool";
import { CustomError } from "../../utils/types/interfaces";
import { SigninRequest, SigninResponse } from "./signin.types";
import { SqlQueries } from "../../utils/database/sql-queries";
import { SqlOperator } from "../../utils/types/enums";

export const signinRouteController: RequestHandler = async (req, res, next) => {
    // Extract data from body
    const reqBody = req.body as SigninRequest;
    // Extract data and email
    const email = reqBody.email;
    const password = reqBody.password;
    try {
        const mysqlResponse = await SqlQueries.selectFrom("users", undefined, [
            "email",
            SqlOperator["="],
            email,
        ]);
        if (mysqlResponse[0].length > 0) {
            // User found
            // Extract user from mysql response
            const user = mysqlResponse[0][0] as User;
            // Compare passwords
            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );
            // If password is correct, generate a token and return it to the user
            if (isPasswordCorrect) {
                // Generate token with user data
                const token = jwt.sign(
                    {
                        id: user.id,
                        email: user.email,
                    },
                    process.env.TOKEN_SECRET as Secret,
                    { expiresIn: "1h" }
                );
                // Create response object
                const response: SigninResponse = {
                    token: token,
                };
                return res.status(200).json(response);
            } else {
                // Create custom error message from mysql error
                const error: CustomError = {
                    statusCode: 401,
                    message: "Email or password is incorrect",
                };
                throw error;
            }
        } else {
            // Create custom error message from mysql error
            const error: CustomError = {
                statusCode: 404,
                message: "User not found",
            };
            throw error;
        }
    } catch (err) {
        // Pass error to error handler middleware
        return next(err);
    }
};
