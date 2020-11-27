"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sql_queries_1 = require("../database/sql-queries");
const enums_1 = require("../types/enums");
exports.authController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
                // Extract user id to fetch role from DB
                const userId = decodedToken.id;
                // Extract rows from DB
                const [rows] = yield sql_queries_1.SqlQueries.selectFrom("users", ["role"], ["id", enums_1.SqlOperator["="], userId]);
                // Extract user role
                const userRole = rows[0].role;
                // Add user id and role from to the request to make it a CustomRequest
                req.userId = userId;
                req.userRole = userRole;
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
});
