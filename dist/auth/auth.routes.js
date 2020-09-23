"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const auth_controllers_1 = require("./auth.controllers");
exports.authRouter = express_1.Router();
// POST /auth/signup
exports.authRouter.post("/signup", auth_controllers_1.authSignupRouteController);
