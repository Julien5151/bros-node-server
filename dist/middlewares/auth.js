"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
exports.authController = (req, res, next) => {
    if (req.headers.token === process.env.TOKEN)
        next();
    else {
        // Invalid token, reject request
        const invalidTokenError = {
            statusCode: 403,
            message: "Invalid token",
        };
        throw invalidTokenError;
    }
};
