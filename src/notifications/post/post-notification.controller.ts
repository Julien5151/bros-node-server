import { RequestHandler } from "express";
import { sendNotification, SendResult } from "web-push";
import { Subscription } from "../../models/subscription";
import { CustomError } from "../../utils/types/interfaces";
import { NotificationPostRequest } from "./post-notification.types";

export const postNotificationRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    try {
        // Extract data from body
        const reqBody = req.body as NotificationPostRequest;
        const message = reqBody.message;
        // Load subscriptions
        const subscriptions = await Subscription.loadAll();
        const sendResultPromises: Array<Promise<SendResult>> = [];
        subscriptions.forEach((subscription) => {
            sendResultPromises.push(
                sendNotification(
                    {
                        endpoint: subscription.endpoint,
                        keys: {
                            auth: subscription.keys.auth,
                            p256dh: subscription.keys.p256dh,
                        },
                    },
                    JSON.stringify({ message })
                )
            );
        });
        const sendResults = await Promise.allSettled(sendResultPromises);
        return res.status(200).json({ message: "Push notifications sent" });
    } catch (error) {
        // If user not found return 404 error
        if (error.statusCode === 404) {
            next(error);
        } else {
            // Other kind of DB error
            console.error(error.message);
            // Return a generic message to client
            const customError: CustomError = {
                statusCode: 500,
                message: "Something went wrong",
            };
            return next(customError);
        }
    }
};
