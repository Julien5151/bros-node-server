import { RequestHandler } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { CustomError } from "../types/interfaces";

export const authController: RequestHandler = (req, res, next) => {
    // Extract token from request
    const token = req.get("Authorization")?.split(" ")[1] as string;
    // If a token is found, verify it
    if (token) {
        // Try to verify the token
        try {
            const decodedToken = jwt.verify(
                token,
                process.env.TOKEN_SECRET as Secret
            );
            // Add user id from token to the request
            (req as any).userId = (decodedToken as any).id;
            // Proceed to next middlewares
            next();
        } catch (err) {
            // If token couldn't be verified, throw 401 error
            const verifyError: CustomError = {
                statusCode: 401,
                message: "Invalid token",
            };
            next(verifyError);
        }
    } else {
        // If token or Authorization header is missing, throw 401 error
        const missingTokenError: CustomError = {
            statusCode: 401,
            message: "No token provided",
        };
        next(missingTokenError);
    }
};
