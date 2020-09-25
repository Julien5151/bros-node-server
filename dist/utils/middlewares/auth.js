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
        // Create decoded token variable
        let decodedToken;
        try {
            const decodedToken = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
            res.status(200).json({ message: "token valid !" });
        }
        catch (err) {
            const verifyError = {
                statusCode: 401,
                message: "Invalid token",
            };
            next(verifyError);
        }
    }
    else {
        const missingTokenError = {
            statusCode: 401,
            message: "No token provided",
        };
        next(missingTokenError);
    }
};
