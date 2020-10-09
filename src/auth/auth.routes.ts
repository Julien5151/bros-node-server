import { Router } from "express";
import { body } from "express-validator";
import { validationErrorsController } from "../utils/middlewares/validation-errors";
import { signinRouteController } from "./signin/signin.controllers";
import { signupRouteController } from "./signup/signup.controllers";

export const authRouter = Router();

// POST /auth/signup
authRouter.post(
    "/signup",
    [body("email").isEmail(), body("password").isLength({ min: 9 })],
    validationErrorsController,
    signupRouteController
);

// POST /auth/signin
authRouter.post(
    "/signin",
    [body("email").isEmail(), body("password").isLength({ min: 9 })],
    validationErrorsController,
    signinRouteController
);
