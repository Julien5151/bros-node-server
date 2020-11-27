import { RequestHandler } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { SqlQueries } from "../database/sql-queries";
import { SqlOperator } from "../types/enums";
import { CustomError } from "../types/interfaces";

export const authController: RequestHandler = async (req, res, next) => {
    // Extract token from request
    const token = req.get("Authorization");
    // If a token is found, verify it
    if (token) {
        // Try to verify the token
        try {
            // If environment variable DEV_TOKEN exists we're not in prod
            if (process.env.DEV_TOKEN && token === process.env.DEV_TOKEN) {
                // If correct dev token is used, proceed to next middlewares
                next();
            } else {
                // We're in production, verify token
                const decodedToken = jwt.verify(
                    token,
                    process.env.TOKEN_SECRET as Secret
                );
                // Extract user id to fetch role from DB
                const userId = (decodedToken as any).id;
                // Extract rows from DB
                const [rows] = await SqlQueries.selectFrom(
                    "users",
                    ["role"],
                    ["id", SqlOperator["="], userId]
                );
                // Extract user role
                const userRole = rows[0].role;
                // Add user id and role from to the request to make it a CustomRequest
                (req as any).userId = userId;
                (req as any).userRole = userRole;
                // Proceed to next middlewares
                next();
            }
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
