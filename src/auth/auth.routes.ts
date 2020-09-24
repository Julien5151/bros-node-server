import { Router } from "express";
import { signupRouteController } from "./signup/signup.controllers";

export const authRouter = Router();

// POST /auth/signup
authRouter.post("/signup", signupRouteController);
