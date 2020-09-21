import { Router } from "express";
import {
    deleteUsersRouteController,
    postUsersRouteController,
} from "./users.controllers";

export const usersRouter = Router();

// DELETE /users/userId
usersRouter.delete("/:id", deleteUsersRouteController);

// POST /users
usersRouter.post("/", postUsersRouteController);
