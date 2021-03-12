"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const post_user_controller_1 = require("./post/post-user.controller");
const validation_errors_1 = require("../utils/middlewares/validation-errors");
exports.usersRouter = express_1.Router();
// GET /users
// usersRouter.get("/", getUsersRouteController);
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
// usersRouter.patch(
//     "/:id",
//     [
//         body("email").isEmail(),
//         body("phone").isMobilePhone("fr-FR"),
//         body("zipcode").isInt({ min: 1, max: 99 }),
//         body("password").isLength({ min: 9 }),
//     ],
//     partialValidationErrorsController,
//     patchUserRouteController
// );
// DELETE /users/:id
// usersRouter.delete("/:id", deleteUserRouteController);
