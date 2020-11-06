import { Router } from "express";
import { getUsersRouteController } from "./get/get-users.controller";
import { patchUserRouteController } from "./patch/patch-user.controller";
import { body } from "express-validator";
import { partialValidationErrorsController } from "../utils/middlewares/partial-validation-errors";
import { deleteUserRouteController } from "./delete/delete-user.controller";
import { postUserRouteController } from "./post/post-user.controller";
import { validationErrorsController } from "../utils/middlewares/validation-errors";
import { authController } from "../utils/middlewares/auth";

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
        body("zipcode").isPostalCode("FR"),
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
        body("email").isEmail(),
        body("phone").isMobilePhone("fr-FR"),
        body("zipcode").isPostalCode("FR"),
        body("password").isLength({ min: 9 }),
    ],
    partialValidationErrorsController,
    patchUserRouteController
);

// DELETE /users/:id
usersRouter.delete("/:id", deleteUserRouteController);
