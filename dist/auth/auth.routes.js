"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const signin_controllers_1 = require("./signin/signin.controllers");
const signup_controllers_1 = require("./signup/signup.controllers");
exports.authRouter = express_1.Router();
// POST /auth/signup
exports.authRouter.post("/signup", signup_controllers_1.signupRouteController);
// POST /auth/signin
exports.authRouter.post("/signin", signin_controllers_1.signinRouteController);
