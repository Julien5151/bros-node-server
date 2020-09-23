import { Router } from "express";
import { authSignupRouteController } from "./auth.controllers";

export const authRouter = Router();

// POST /auth/signup
authRouter.post("/signup", authSignupRouteController);
