import { Router } from "express";
import { signinRouteController } from "./signin/signin.controllers";
import { signupRouteController } from "./signup/signup.controllers";

export const authRouter = Router();

// POST /auth/signup
authRouter.post("/signup", signupRouteController);

// POST /auth/signin
authRouter.post("/signin", signinRouteController);
