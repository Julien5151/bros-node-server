import { Router } from "express";
import { body } from "express-validator";
import { validationErrorsController } from "../utils/middlewares/validation-errors";
import { postNotificationRouteController } from "./post/post-notification.controller";

export const notificationsRouter = Router();

// POST /notification
notificationsRouter.post(
    "/",
    [body("message").isString().isLength({ min: 1 })],
    validationErrorsController,
    postNotificationRouteController
);
