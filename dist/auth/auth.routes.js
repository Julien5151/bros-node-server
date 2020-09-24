"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const signup_controllers_1 = require("./signup/signup.controllers");
exports.authRouter = express_1.Router();
// POST /auth/signup
exports.authRouter.post("/signup", signup_controllers_1.signupRouteController);
