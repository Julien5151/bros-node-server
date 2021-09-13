import { Router } from "express";
import { body } from "express-validator";
import { validationErrorsController } from "../utils/middlewares/validation-errors";
import { registerRouteController } from "./register/register.controllers";
import { signinRouteController } from "./signin/signin.controllers";
import { signupRouteController } from "./signup/signup.controllers";

export const authRouter = Router();

// POST /auth/signin
authRouter.post(
    "/signin",
    [body("email").isEmail(), body("password").isLength({ min: 9 })],
    validationErrorsController,
    signinRouteController
);

// POST /auth/register
authRouter.post(
    "/register",
    [body("email").isEmail()],
    validationErrorsController,
    registerRouteController
);

// POST /auth/signup
authRouter.post("/signup", signupRouteController);
