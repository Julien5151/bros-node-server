import { Router } from "express";
import { postMockedUsersRouteController } from "./post/post-mocked-users.controller";

export const adminRouter = Router();

// POST /create-mocked-users
adminRouter.post("/create-mocked-users", postMockedUsersRouteController);
