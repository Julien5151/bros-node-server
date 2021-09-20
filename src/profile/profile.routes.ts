import { Router } from "express";
import { getProfileRouteController } from "./get/get-profile.controller";

export const profileRouter = Router();

// GET /profile
profileRouter.get("/", getProfileRouteController);
