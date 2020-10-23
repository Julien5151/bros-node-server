import { Router } from "express";
import { getUsersRouteController } from "./get/get-users.controller";
import { patchUserRouteController } from "./patch/patch-user.controller";
import { body } from "express-validator";
import { partialValidationErrorsController } from "../utils/middlewares/partial-validation-errors";
import { deleteUserRouteController } from "./delete/delete-user.controller";

export const usersRouter = Router();

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

// GET /users
usersRouter.get("/", getUsersRouteController);
