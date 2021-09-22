"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAdminRoleController = void 0;
const enums_1 = require("../types/enums");
// This middleware should always be used after auth middleware because it relies
// on user role to be set in response locals
const checkAdminRoleController = async (req, res, next) => {
    // Extract role
    const userRole = res.locals.userRole;
    // If user if admin
    if (userRole === enums_1.UserRole.admin) {
        // Proceed to next middlewares
        next();
    }
    else {
        // Throw 403 error
        const verifyError = {
            statusCode: 403,
            message: "Insufficient permissions",
        };
        next(verifyError);
    }
};
exports.checkAdminRoleController = checkAdminRoleController;
