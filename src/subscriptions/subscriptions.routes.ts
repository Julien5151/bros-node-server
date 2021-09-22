import { Router } from "express";
import { postSubscriptionRouteController } from "./post/post-subscription.controller";

export const subscriptionsRouter = Router();

// POST /subscription
subscriptionsRouter.post("/", postSubscriptionRouteController);
