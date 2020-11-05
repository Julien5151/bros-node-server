import { Router } from "express";
import { body } from "express-validator";
import { validationErrorsController } from "../utils/middlewares/validation-errors";
import { groupTypeRegex } from "../utils/types/enums";
import { postGroupRouteController } from "./post/post-group.controller";

export const groupsRouter = Router();

// POST /groups
groupsRouter.post(
    "/",
    [body("name").isLength({ min: 2 }), body("type").matches(groupTypeRegex)],
    validationErrorsController,
    postGroupRouteController
);
