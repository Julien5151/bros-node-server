"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionsRouter = void 0;
const express_1 = require("express");
const post_subscription_controller_1 = require("./post/post-subscription.controller");
exports.subscriptionsRouter = express_1.Router();
// POST /subscription
exports.subscriptionsRouter.post("/", post_subscription_controller_1.postSubscriptionRouteController);
