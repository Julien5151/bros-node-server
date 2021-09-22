import { RequestHandler } from "express";
import { NotificationPostRequest } from "./post-notification.types";

export const postNotificationRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body
    const reqBody = req.body as NotificationPostRequest;
    return res.status(200).json({ message: "Push notification sent" });
};
