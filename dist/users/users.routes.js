"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const get_users_controller_1 = require("./get/get-users.controller");
const patch_user_controller_1 = require("./patch/patch-user.controller");
const express_validator_1 = require("express-validator");
const partial_validation_errors_1 = require("../utils/middlewares/partial-validation-errors");
const delete_user_controller_1 = require("./delete/delete-user.controller");
exports.usersRouter = express_1.Router();
// PATCH /users/:id
exports.usersRouter.patch("/:id", [
    express_validator_1.body("email").isEmail(),
    express_validator_1.body("phone").isMobilePhone("fr-FR"),
    express_validator_1.body("zipcode").isPostalCode("FR"),
    express_validator_1.body("password").isLength({ min: 9 }),
], partial_validation_errors_1.partialValidationErrorsController, patch_user_controller_1.patchUserRouteController);
// DELETE /users/:id
exports.usersRouter.delete("/:id", delete_user_controller_1.deleteUserRouteController);
// GET /users
exports.usersRouter.get("/", get_users_controller_1.getUsersRouteController);
