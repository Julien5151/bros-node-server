import { Router } from "express";
import { getUsersRouteController } from "./get/get-users.controller";
import { patchUserRouteController } from "./patch/patch-user.controller";
import { body } from "express-validator";
import { validationErrorsController } from "../utils/middlewares/validation-errors";

export const usersRouter = Router();

// PATCH /users/:id
usersRouter.patch(
    "/:id",
    [body("email").isEmail(), body("password").isLength({ min: 9 })],
    validationErrorsController,
    patchUserRouteController
);

// GET /users
usersRouter.get("/", getUsersRouteController);
