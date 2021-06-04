import { Router } from "express";
import { body } from "express-validator";
import { postUserRouteController } from "./post/post-user.controller";
import { validationErrorsController } from "../utils/middlewares/validation-errors";
import { getUsersRouteController } from "./get/get-users.controller";
import { patchUserRouteController } from "./patch/patch-user.controller";
import { deleteUserRouteController } from "./delete/delete-user.controller";

export const usersRouter = Router();

// GET /users
usersRouter.get("/", getUsersRouteController);

// POST /users
usersRouter.post(
    "/",
    [
        body("firstName").isString().isLength({ min: 1 }),
        body("lastName").isString().isLength({ min: 1 }),
        body("email").isEmail(),
        body("zipcode").isInt({ min: 1, max: 99 }),
        body("password").isString().isLength({ min: 9 }),
        body("confirmedPassword").isString().isLength({ min: 9 }),
    ],
    validationErrorsController,
    postUserRouteController
);

// PATCH /users/:id
usersRouter.patch(
    "/:id",
    [
        body("firstName").isString().isLength({ min: 1 }),
        body("lastName").isString().isLength({ min: 1 }),
        body("password").isString().isLength({ min: 9 }),
        body("phone").isMobilePhone("fr-FR"),
        body("address").isString(),
    ],
    validationErrorsController,
    patchUserRouteController
);

// DELETE /users/:id
usersRouter.delete("/:id", deleteUserRouteController);
