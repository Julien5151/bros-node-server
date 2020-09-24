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
exports.signupRouteController = void 0;
const connectionPool_1 = require("../../utils/database/connectionPool");
const enums_1 = require("../../utils/types/enums");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.signupRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body
    const reqBody = req.body;
    // Create new user object (visitor at signup)
    const newUser = {
        email: reqBody.email,
        role: enums_1.UserRole.visitor,
        createdAt: new Date(),
    };
    try {
        // Hash password using bcrypt
        const hashedPassword = yield bcryptjs_1.default.hash(reqBody.password, 12);
        yield connectionPool_1.connectionPool.execute("INSERT INTO users (email, password, role, created_at) VALUES (?, ?, ?, ?);", [newUser.email, hashedPassword, newUser.role, newUser.createdAt]);
        // Create response object
        const response = {
            message: "Signup successfull",
        };
        return res.status(201).json(response);
    }
    catch (err) {
        // Create custom error message from mysql error
        const error = {
            statusCode: 500,
            message: err.message,
        };
        // Pass error to error handler middleware
        next(error);
    }
});
