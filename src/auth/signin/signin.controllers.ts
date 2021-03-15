import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../../models/user";
import { CustomError } from "../../utils/types/interfaces";
import { SigninRequest, SigninResponse } from "./signin.types";

export const signinRouteController: RequestHandler = async (req, res, next) => {
    // Extract data from body
    const reqBody = req.body as SigninRequest;
    // Extract data and email
    const email = reqBody.email;
    const password = reqBody.password;
    try {
        // Fetch user from DB
        const user = await User.load(email);
        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        // If password is correct, generate a token and return it to the user
        if (isPasswordCorrect) {
            // Generate token with user data
            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.email,
                    role: user.role,
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
            // Throw invalid password error
            const invalidPasswordError: CustomError = {
                statusCode: 401,
                message: "Invalid password",
            };
            throw invalidPasswordError;
        }
    } catch (error) {
        // If user not found or invalid password, return global error to avoid
        // specifying which one is invalid (security)
        if (error.statusCode === 404 || error.statusCode === 401) {
            // Throw invalid password or email error
            const invalidPasswordOrEmailError: CustomError = {
                statusCode: 401,
                message: "Invalid password or email",
            };
            next(invalidPasswordOrEmailError);
        } else {
            // Other kind of DB error
            console.error(error.message);
            // Return a generic message to client
            const customError: CustomError = {
                statusCode: 500,
                message: "Something went wrong",
            };
            return next(customError);
        }
    }
};
