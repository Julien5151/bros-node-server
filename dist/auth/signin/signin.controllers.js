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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinRouteController = void 0;
const connectionPool_1 = require("../../utils/database/connectionPool");
exports.signinRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body
    const reqBody = req.body;
    // Extract data and email
    const email = reqBody.email;
    const password = reqBody.password;
    try {
        // Check that this user exists in database
        const mysqlResponse = yield connectionPool_1.connectionPool.execute("SELECT * FROM users WHERE email = ?;", [email]);
        if (mysqlResponse[0].length > 0) {
            // User found
            // Extract user from mysql response
            const user = mysqlResponse[0][0];
            // Create response object
            const response = {
                token: "toto",
            };
            return res.status(200).json(response);
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
        next(err);
    }
});
