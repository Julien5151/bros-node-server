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
exports.postMockedUsersRouteController = void 0;
const users_1 = require("../../utils/mocked-data/users");
const enums_1 = require("../../utils/types/enums");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const sql_queries_1 = require("../../utils/database/sql-queries");
exports.postMockedUsersRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract static mocked data
    const mockedUsers = users_1.MockedUsers;
    // Add password
    try {
        // Array of values to be inserted into DB
        const userValuesArray = [];
        // Loop on each mocked user to hash password and add date and role
        mockedUsers.forEach((user) => {
            // Update mocked user data
            const hashedPassword = bcryptjs_1.default.hashSync(user.password, 12);
            user.password = hashedPassword;
            user.role = enums_1.UserRole.visitor;
            user.createdAt = new Date();
            // Add each array of value to be inserted into DB
            userValuesArray.push(Object.values(user));
        });
        console.log(userValuesArray);
        // Insert new user in DB
        const [insertResponse] = yield sql_queries_1.SqlQueries.insertInto("users", [
            "first_name",
            "last_name",
            "password",
            "email",
            "phone",
            "zipcode",
            "role",
            "created_at",
        ], userValuesArray);
        // Users were created successfully
        return res.status(201).json({
            message: `${insertResponse.affectedRows} mocked users created`,
        });
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
