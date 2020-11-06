"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validation_errors_1 = require("../utils/middlewares/validation-errors");
const signin_controllers_1 = require("./signin/signin.controllers");
exports.authRouter = express_1.Router();
// POST /auth/signin
exports.authRouter.post("/signin", [express_validator_1.body("email").isEmail(), express_validator_1.body("password").isLength({ min: 9 })], validation_errors_1.validationErrorsController, signin_controllers_1.signinRouteController);
