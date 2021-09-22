import { RequestHandler } from "express";
import { Subscription } from "../../models/subscription";

export const postSubscriptionRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body
    const reqBody = req.body;
    // Create new subscription object mandatory fields
    const newSubscription = new Subscription({
        endpoint: reqBody.endpoint,
        keys: {
            auth: reqBody.keys.auth,
            p256dh: reqBody.keys.p256dh,
        },
    });
    // Insert new subcription in DB
    await newSubscription.create();
    // If user successfully created, return the created user
    return res.status(201).json(newSubscription.getPlainObject());
};
