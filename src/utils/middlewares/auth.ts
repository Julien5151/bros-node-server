import { RequestHandler } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { User } from "../../models/user";
import { UserRole } from "../types/enums";
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
                // If correct dev token is used, proceed to next middlewares with dev admin role
                res.locals.userId = "dev-admin";
                res.locals.userRole = UserRole.admin;
                next();
            } else {
                // We're in production, verify token
                const decodedToken = jwt.verify(
                    token,
                    process.env.TOKEN_SECRET as Secret
                );
                // Extract user id to fetch role from DB
                const userId = (decodedToken as any).id;
                const user = await User.load(userId);
                // Extract user role
                const userRole = user.role;
                // Add user id and role from to the res locals
                res.locals.userId = userId;
                res.locals.userRole = userRole;
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
