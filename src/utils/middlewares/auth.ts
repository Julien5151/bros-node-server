import { RequestHandler } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { CustomError } from "../types/interfaces";

export const authController: RequestHandler = (req, res, next) => {
    // Extract token from request
    const token = req.get("Authorization")?.split(" ")[1] as string;
    // If a token is found, verify it
    if (token) {
        // Create decoded token variable
        let decodedToken;
        try {
            const decodedToken = jwt.verify(
                token,
                process.env.TOKEN_SECRET as Secret
            );
            res.status(200).json({ message: "token valid !" });
        } catch (err) {
            const verifyError: CustomError = {
                statusCode: 401,
                message: "Invalid token",
            };
            next(verifyError);
        }
    } else {
        const missingTokenError: CustomError = {
            statusCode: 401,
            message: "No token provided",
        };
        next(missingTokenError);
    }
};
