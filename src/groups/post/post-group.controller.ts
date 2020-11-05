import { RequestHandler } from "express";
import { GroupPostRequest } from "./post-group.types";

export const postGroupRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body
    const reqBody = req.body as GroupPostRequest;
    // Check if passwords match
    return res.status(200).json({ message: "group created" });
};
