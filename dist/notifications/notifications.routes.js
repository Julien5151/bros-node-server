"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validation_errors_1 = require("../utils/middlewares/validation-errors");
const post_notification_controller_1 = require("./post/post-notification.controller");
exports.notificationsRouter = express_1.Router();
// POST /notification
exports.notificationsRouter.post("/", [express_validator_1.body("message").isString().isLength({ min: 1 })], validation_errors_1.validationErrorsController, post_notification_controller_1.postNotificationRouteController);
