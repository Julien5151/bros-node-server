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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_1 = require("../../models/user");
const postUserRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body
    const reqBody = req.body;
    // Check if passwords match
    if (reqBody.password === reqBody.confirmedPassword) {
        // Add password
        try {
            // Hash password using bcrypt
            const hashedPassword = yield bcryptjs_1.default.hash(reqBody.password, 12);
            // Create new user object mandatory fields (visitor at signup)
            const newUser = new user_1.User({
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                email: reqBody.email,
                zipcode: reqBody.zipcode,
                password: hashedPassword,
            });
            // Insert new user in DB
            yield newUser.create();
            // If user successfully created, return the created user
            return res.status(201).json(newUser.getPlainObject());
        }
        catch (error) {
            const customError = {
                statusCode: 500,
                message: "Something went wrong",
            };
            if (error.code === 11000) {
                // Duplicate email (error code 11000)
                customError.statusCode = 409;
                customError.message = "This user already exists";
            }
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
exports.postUserRouteController = postUserRouteController;
