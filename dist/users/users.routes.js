"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const get_users_controller_1 = require("./get/get-users.controller");
const patch_user_controller_1 = require("./patch/patch-user.controller");
const express_validator_1 = require("express-validator");
const validation_errors_1 = require("../utils/middlewares/validation-errors");
exports.usersRouter = express_1.Router();
// PATCH /users/:id
exports.usersRouter.patch("/:id", [express_validator_1.body("email").isEmail(), express_validator_1.body("password").isLength({ min: 9 })], validation_errors_1.validationErrorsController, patch_user_controller_1.patchUserRouteController);
// GET /users
exports.usersRouter.get("/", get_users_controller_1.getUsersRouteController);
