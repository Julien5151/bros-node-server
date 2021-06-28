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
const patchUserRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body and user id from params
    const reqBody = req.body;
    const userId = req.params["id"];
    try {
        // Load user from DB
        const patchedUser = yield user_1.User.load(userId);
        // Fill arrays based on request content
        for (const key in reqBody) {
            // For password key, needs to be hashed
            if (key === "password") {
                // Hash password using bcrypt
                const hashedPassword = yield bcryptjs_1.default.hash(reqBody[key], 12);
                patchedUser.password = hashedPassword;
            }
            else {
                // We know key will be of the relevant type thanks to validationErrorsController
                // as never is a weird typescript typing but is necessary
                patchedUser[key] = reqBody[key];
            }
        }
        // Update user in DB
        yield patchedUser.update();
        // If user successfully patched, return the updated user
        return res.status(201).json(patchedUser.getPlainObject());
    }
    catch (error) {
        // If user not found return 404 error
        if (error.statusCode === 404) {
            next(error);
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
exports.patchUserRouteController = patchUserRouteController;
