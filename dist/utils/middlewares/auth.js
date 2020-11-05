"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authController = (req, res, next) => {
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
            }
            else {
                // We're in production, verify token
                const decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
                // Add user id from token to the request
                req.userId = decodedToken.id;
                // Proceed to next middlewares
                next();
            }
        }
        catch (err) {
            // If token couldn't be verified, throw 401 error
            const verifyError = {
                statusCode: 401,
                message: "Invalid token",
            };
            next(verifyError);
        }
    }
    else {
        // If token or Authorization header is missing, throw 401 error
        const missingTokenError = {
            statusCode: 401,
            message: "No token provided",
        };
        next(missingTokenError);
    }
};
