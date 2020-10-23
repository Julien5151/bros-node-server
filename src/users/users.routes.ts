import { Router } from "express";
import { getUsersRouteController } from "./get/get-users.controller";
import { patchUserRouteController } from "./patch/patch-user.controller";

export const usersRouter = Router();

// PATCH /users/:id
usersRouter.patch("/:id", patchUserRouteController);

// GET /users
usersRouter.get("/", getUsersRouteController);
