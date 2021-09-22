"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileRouteController = void 0;
const enums_1 = require("../../utils/types/enums");
const getProfileRouteController = async (req, res, next) => {
    // Check if we are in dev or production
    if (res.locals.userId === enums_1.SpecialUsers["dev-admin"]) {
        // Throw an error, dev-admin doesn't have a profile
        const customError = {
            statusCode: 400,
            message: "Dev admin doesn't have a valid profile",
        };
        return next(customError);
    }
    else {
        // Get user object stored locals after login
        const user = res.locals.user;
        // If user successfully created, return the created user
        return res.status(200).json(user.getPlainObject());
    }
};
exports.getProfileRouteController = getProfileRouteController;
