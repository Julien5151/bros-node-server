import { Router } from "express";
import { postUsersRouteController } from "./users.controllers";

export const usersRouter = Router();

// POST /users
usersRouter.post("", postUsersRouteController);
