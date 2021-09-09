import { RequestHandler } from "express";
import { RegisterRequest } from "./register.types";

export const registerRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body
    const reqBody = req.body as RegisterRequest;
    // Extract data and email
    const email = reqBody.email;
    // Create response object
    //   const response: RegisterResponse = {
    //     token: token,
    // };
    return res.status(200).json({ message: "register successfull" });
};
