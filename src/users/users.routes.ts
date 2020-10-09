import { Router } from "express";
import { getUsersRouteController } from "./get/get-users.controller";

export const usersRouter = Router();

// GET /users
usersRouter.get("/", getUsersRouteController);
