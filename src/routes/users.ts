import { Router } from "express";
import { postUsersRouteController } from "../controllers/users";

export const usersRouter = Router();

// POST /users
usersRouter.post("", postUsersRouteController);
