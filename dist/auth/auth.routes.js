"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
exports.authRouter = express_1.Router();
// POST /auth/signin
// authRouter.post(
//     "/signin",
//     [body("email").isEmail(), body("password").isLength({ min: 9 })],
//     validationErrorsController,
//     signinRouteController
// );
