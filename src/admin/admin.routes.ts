import { Router } from "express";
import { deleteAllUsersRouteController } from "./delete/delete-all-users.controller";
import { postMockedUsersRouteController } from "./post/post-mocked-users.controller";

export const adminRouter = Router();

// POST /create-mocked-users
adminRouter.post("/create-mocked-users", postMockedUsersRouteController);

// DELETE /users
adminRouter.delete("/users", deleteAllUsersRouteController);
