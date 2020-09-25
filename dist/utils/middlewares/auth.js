"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authController = (req, res, next) => {
    var _a;
    // Extract token from request
    const token = (_a = req.get("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    // If a token is found, verify it
    if (token) {
        // Try to verify the token
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            // Add user id from token to the request
            req.userId = decodedToken.id;
            // Proceed to next middlewares
            next();
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
