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
const user_1 = require("../../models/user");
exports.patchUserRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body and user id from params
    const reqBody = req.body;
    const userId = req.params["id"];
    try {
        // Load user from DB
        const patchedUser = yield user_1.User.load(userId);
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
                    patchedUser.firstName = reqBody[key];
                    break;
                case "lastName":
                    patchedUser.lastName = reqBody[key];
                    break;
                case "email":
                    patchedUser.email = reqBody[key];
                    break;
                case "phone":
                    patchedUser.phone = reqBody[key];
                    break;
                case "address":
                    patchedUser.address = reqBody[key];
                    break;
                case "zipcode":
                    patchedUser.zipcode = reqBody[key];
                    break;
                case "password":
                    // Hash password using bcrypt
                    hashedPassword = yield bcryptjs_1.default.hash(reqBody[key], 12);
                    patchedUser.password = hashedPassword;
                    break;
                default:
                    // Unauthorized field name detected, return a 400
                    customError.message += key;
                    return next(customError);
            }
        }
        // Update user in DB
        yield patchedUser.update();
        // If user successfully patched, return the updated user
        return res.status(201).json(patchedUser.getPlainObject());
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
