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
const user_1 = require("../../models/user");
const users_1 = require("../../utils/mocked-data/users");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const postMockedUsersRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Deep copy of original array
    const mockedUsers = JSON.parse(JSON.stringify(users_1.MockedUsers));
    // Create mocked user with hashed password in DB
    try {
        for (let i = 0; i < mockedUsers.length; i++) {
            // Use sync hashing as it's an admin only action
            mockedUsers[i].password = bcryptjs_1.default.hashSync(mockedUsers[i].password, 12);
            const newUser = new user_1.User({
                firstName: mockedUsers[i].firstName,
                lastName: mockedUsers[i].lastName,
                email: mockedUsers[i].email,
                zipcode: mockedUsers[i].zipcode,
                password: mockedUsers[i].password,
                grouped: mockedUsers[i].grouped,
                availableForGrouping: mockedUsers[i].availableForGrouping,
            });
            // Insert new user in DB
            yield newUser.create();
        }
        // Users were created successfully
        return res.status(201).json({
            message: `${mockedUsers.length} mocked users successfully created`,
        });
    }
    catch (error) {
        // In case of DB error, log the error
        console.error(error.message);
        // Return a generic message to client
        const customError = {
            statusCode: 500,
            message: "Something went wrong",
        };
        return next(customError);
    }
});
exports.postMockedUsersRouteController = postMockedUsersRouteController;
