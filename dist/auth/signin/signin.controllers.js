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
const user_1 = require("../../models/user");
const signinRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body
    const reqBody = req.body;
    // Extract data and email
    const email = reqBody.email;
    const password = reqBody.password;
    try {
        // Fetch user from DB
        const user = yield user_1.User.load(email);
        // Compare passwords
        const isPasswordCorrect = yield bcryptjs_1.default.compare(password, user.password);
        // If password is correct, generate a token and return it to the user
        if (isPasswordCorrect) {
            // Generate token with user data
            const token = jsonwebtoken_1.default.sign({
                id: user._id,
                email: user.email,
                role: user.role,
            }, process.env.TOKEN_SECRET, { expiresIn: "1h" });
            // Create response object
            const response = {
                token: token,
            };
            return res.status(200).json(response);
        }
        else {
            // Throw invalid password error
            const invalidPasswordError = {
                statusCode: 401,
                message: "Invalid password",
            };
            throw invalidPasswordError;
        }
    }
    catch (error) {
        // If user not found or invalid password, return global error to avoid
        // specifying which one is invalid (security)
        if (error.statusCode === 404 || error.statusCode === 401) {
            // Throw invalid password or email error
            const invalidPasswordOrEmailError = {
                statusCode: 401,
                message: "Invalid password or email",
            };
            next(invalidPasswordOrEmailError);
        }
        else {
            // Other kind of DB error
            console.error(error.message);
            // Return a generic message to client
            const customError = {
                statusCode: 500,
                message: "Something went wrong",
            };
            return next(customError);
        }
    }
});
exports.signinRouteController = signinRouteController;
