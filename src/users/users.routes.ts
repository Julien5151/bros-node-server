import { Router } from "express";
import { body } from "express-validator";
import { postUserRouteController } from "./post/post-user.controller";
import { validationErrorsController } from "../utils/middlewares/validation-errors";
import { getUsersRouteController } from "./get/get-users.controller";
import { partialValidationErrorsController } from "../utils/middlewares/partial-validation-errors";
import { patchUserRouteController } from "./patch/patch-user.controller";
import { deleteUserRouteController } from "./delete/delete-user.controller";
import { UserRole } from "../utils/types/enums";

export const usersRouter = Router();

// GET /users
usersRouter.get("/", getUsersRouteController);

// POST /users
usersRouter.post(
    "/",
    [
        body("firstName").isLength({ min: 1 }),
        body("lastName").isLength({ min: 1 }),
        body("email").isEmail(),
        body("zipcode").isInt({ min: 1, max: 99 }),
        body("password").isLength({ min: 9 }),
        body("confirmedPassword").isLength({ min: 9 }),
    ],
    validationErrorsController,
    postUserRouteController
);

// PATCH /users/:id
usersRouter.patch(
    "/:id",
    [
        body("firstName").isLength({ min: 1 }),
        body("lastName").isLength({ min: 1 }),
        body("email").isEmail(),
        body("phone").isMobilePhone("fr-FR"),
        body("zipcode").isInt({ min: 1, max: 99 }),
        body("password").isLength({ min: 9 }),
        body("role").isIn([
            UserRole.visitor,
            UserRole.bro,
            UserRole.corporate,
            UserRole.admin,
        ]),
        body("grouped").isBoolean(),
        body("availableForGrouping").isBoolean(),
    ],
    partialValidationErrorsController,
    patchUserRouteController
);

// DELETE /users/:id
usersRouter.delete("/:id", deleteUserRouteController);
