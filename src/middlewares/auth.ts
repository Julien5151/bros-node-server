import { RequestHandler } from "express";
import { CustomError } from "../utils/interfaces";

export const authController: RequestHandler = (req, res, next) => {
    if (req.headers.token === process.env.TOKEN) next();
    else {
        // Invalid token, reject request
        const invalidTokenError: CustomError = {
            statusCode: 403,
            message: "Invalid token",
        };
        throw invalidTokenError;
    }
};
