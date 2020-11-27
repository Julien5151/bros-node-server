import { RequestHandler } from "express";
import { UserRole } from "../types/enums";
import { CustomError } from "../types/interfaces";

// This middleware should always be used after auth middleware because it relies
// on user role to be set in response locals
export const checkAdminRoleController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract role
    const userRole = res.locals.userRole;
    // If user if admin
    if (userRole === UserRole.admin) {
        // Proceed to next middlewares
        next();
    } else {
        // Throw 403 error
        const verifyError: CustomError = {
            statusCode: 403,
            message: "Insufficient permissions",
        };
        next(verifyError);
    }
};
