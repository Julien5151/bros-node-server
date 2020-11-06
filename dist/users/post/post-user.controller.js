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
exports.postUserRouteController = void 0;
const sql_queries_1 = require("../../utils/database/sql-queries");
const enums_1 = require("../../utils/types/enums");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.postUserRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body
    const reqBody = req.body;
    // Check if passwords match
    if (reqBody.password === reqBody.confirmedPassword) {
        // Create new user object mandatory fields (visitor at signup)
        const newUser = {
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            email: reqBody.email,
            zipcode: reqBody.zipcode,
            role: enums_1.UserRole.visitor,
            createdAt: new Date(),
        };
        // Add optional fields (if provided)
        const optionalFieldNames = [];
        const optionalFieldValues = [];
        //
        if (reqBody.phone) {
            newUser.phone = reqBody.phone;
            optionalFieldNames.push("phone");
            optionalFieldValues.push(reqBody.phone);
        }
        if (reqBody.address) {
            newUser.address = reqBody.address;
            optionalFieldNames.push("address");
            optionalFieldValues.push(reqBody.address);
        }
        // Add password
        try {
            // Hash password using bcrypt
            const hashedPassword = yield bcryptjs_1.default.hash(reqBody.password, 12);
            // Insert new user in DB
            const [insertResponse] = yield sql_queries_1.SqlQueries.insertInto("users", [
                "first_name",
                "last_name",
                "email",
                "password",
                "zipcode",
                "role",
                "created_at",
                ...optionalFieldNames,
            ], [
                newUser.firstName,
                newUser.lastName,
                newUser.email,
                hashedPassword,
                newUser.zipcode,
                newUser.role,
                newUser.createdAt,
                ...optionalFieldValues,
            ]);
            // If user is created successfully, get its id
            const createdUserId = insertResponse.insertId;
            // Fetch created user and return it as a response
            const [rows] = yield sql_queries_1.SqlQueries.selectFrom("users", undefined, [
                "id",
                enums_1.SqlOperator["="],
                createdUserId,
            ]);
            const createdUser = rows[0];
            // Remove password and role field from response
            delete createdUser.password;
            delete createdUser.role;
            // If user successfully created, return the created user
            return res.status(201).json(createdUser);
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
    }
    else {
        // If passwords don't match, send 400 error
        const error = {
            statusCode: 400,
            message: "Passwords don't match",
        };
        // Pass error to error handler middleware
        return next(error);
    }
});
