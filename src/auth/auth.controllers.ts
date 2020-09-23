import { RequestHandler } from "express";

export const authSignupRouteController: RequestHandler = (req, res, next) => {
    res.status(200).json({ message: "signup successful" });
};
