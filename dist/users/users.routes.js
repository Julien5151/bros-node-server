"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const post_user_controller_1 = require("./post/post-user.controller");
const validation_errors_1 = require("../utils/middlewares/validation-errors");
const get_users_controller_1 = require("./get/get-users.controller");
const partial_validation_errors_1 = require("../utils/middlewares/partial-validation-errors");
const patch_user_controller_1 = require("./patch/patch-user.controller");
const delete_user_controller_1 = require("./delete/delete-user.controller");
exports.usersRouter = express_1.Router();
// GET /users
exports.usersRouter.get("/", get_users_controller_1.getUsersRouteController);
// POST /users
exports.usersRouter.post("/", [
    express_validator_1.body("firstName").isLength({ min: 1 }),
    express_validator_1.body("lastName").isLength({ min: 1 }),
    express_validator_1.body("email").isEmail(),
    express_validator_1.body("zipcode").isInt({ min: 1, max: 99 }),
    express_validator_1.body("password").isLength({ min: 9 }),
    express_validator_1.body("confirmedPassword").isLength({ min: 9 }),
], validation_errors_1.validationErrorsController, post_user_controller_1.postUserRouteController);
// PATCH /users/:id
exports.usersRouter.patch("/:id", [
    express_validator_1.body("firstName").isLength({ min: 1 }),
    express_validator_1.body("lastName").isLength({ min: 1 }),
    express_validator_1.body("password").isLength({ min: 9 }),
    express_validator_1.body("phone").isMobilePhone("fr-FR"),
    express_validator_1.body("address").isString(),
], partial_validation_errors_1.partialValidationErrorsController, patch_user_controller_1.patchUserRouteController);
// DELETE /users/:id
exports.usersRouter.delete("/:id", delete_user_controller_1.deleteUserRouteController);
