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
exports.patchUserRouteController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sql_queries_1 = require("../../utils/database/sql-queries");
const enums_1 = require("../../utils/types/enums");
exports.patchUserRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body and user id from params
    const reqBody = req.body;
    const userId = req.params["id"];
    // Create field and values arrays
    const fields = [];
    const fieldValues = [];
    // Fill arrays based on request content
    for (const key in reqBody) {
        let hashedPassword = "";
        // Unauthorized field
        const customError = {
            statusCode: 400,
            message: "Unauthorized field : ",
        };
        switch (key) {
            case "firstName":
                fields.push("first_name");
                fieldValues.push(reqBody[key]);
                break;
            case "lastName":
                fields.push("last_name");
                fieldValues.push(reqBody[key]);
                break;
            case "email":
                fields.push("email");
                fieldValues.push(reqBody[key]);
                break;
            case "phone":
                fields.push("phone");
                fieldValues.push(reqBody[key]);
                break;
            case "address":
                fields.push("address");
                fieldValues.push(reqBody[key]);
                break;
            case "zipcode":
                fields.push("zipcode");
                fieldValues.push(reqBody[key]);
                break;
            case "password":
                fields.push("password");
                // Hash password using bcrypt
                hashedPassword = yield bcryptjs_1.default.hash(reqBody[key], 12);
                fieldValues.push(hashedPassword);
                break;
            default:
                // Unauthorized field name detected, return a 400
                customError.message += key;
                return next(customError);
        }
    }
    // Update user in database
    try {
        const [rows] = yield sql_queries_1.SqlQueries.update("users", fields, fieldValues, [
            "id",
            enums_1.SqlOperator["="],
            userId,
        ]);
        if (rows.changedRows === 1) {
            // User updated successfully, return updated user
            const [rows] = yield sql_queries_1.SqlQueries.selectFrom("users", undefined, [
                "id",
                enums_1.SqlOperator["="],
                userId,
            ]);
            // Removed password and role from response
            const user = rows[0];
            delete user.password;
            delete user.role;
            // Send successfull response
            return res.status(200).json(user);
        }
        else {
            // User not found
            const customError = {
                statusCode: 404,
                message: `User with id (${userId}) doesn't exist`,
            };
            next(customError);
        }
    }
    catch (error) {
        // In case of SQL error, log the error
        console.error(error.message);
        // Return a generic message to client
        const customError = {
            statusCode: 500,
            message: "Something went wrong",
        };
        return next(customError);
    }
});
