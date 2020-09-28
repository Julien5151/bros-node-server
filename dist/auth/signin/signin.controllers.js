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
exports.signinRouteController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sql_queries_1 = require("../../utils/database/sql-queries");
const enums_1 = require("../../utils/types/enums");
exports.signinRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body
    const reqBody = req.body;
    // Extract data and email
    const email = reqBody.email;
    const password = reqBody.password;
    try {
        const mysqlResponse = yield sql_queries_1.SqlQueries.selectFrom("users", undefined, [
            "email",
            enums_1.SqlOperator["="],
            email,
        ]);
        if (mysqlResponse[0].length > 0) {
            // User found
            // Extract user from mysql response
            const user = mysqlResponse[0][0];
            // Compare passwords
            const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
            // If password is correct, generate a token and return it to the user
            if (isPasswordCorrect) {
                // Generate token with user data
                const token = jsonwebtoken_1.default.sign({
                    id: user.id,
                    email: user.email,
                }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
                // Create response object
                const response = {
                    token: token,
                };
                return res.status(200).json(response);
            }
            else {
                // Create custom error message from mysql error
                const error = {
                    statusCode: 401,
                    message: "Email or password is incorrect",
                };
                throw error;
            }
        }
        else {
            // Create custom error message from mysql error
            const error = {
                statusCode: 404,
                message: "User not found",
            };
            throw error;
        }
    }
    catch (err) {
        // Pass error to error handler middleware
        return next(err);
    }
});
