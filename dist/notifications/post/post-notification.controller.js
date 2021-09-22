"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postNotificationRouteController = void 0;
const web_push_1 = require("web-push");
const subscription_1 = require("../../models/subscription");
const postNotificationRouteController = async (req, res, next) => {
    try {
        // Extract data from body
        const reqBody = req.body;
        const message = reqBody.message;
        // Load subscriptions
        const subscriptions = await subscription_1.Subscription.loadAll();
        const sendResultPromises = [];
        subscriptions.forEach((subscription) => {
            sendResultPromises.push(web_push_1.sendNotification({
                endpoint: subscription.endpoint,
                keys: {
                    auth: subscription.keys.auth,
                    p256dh: subscription.keys.p256dh,
                },
            }, JSON.stringify({ message })));
        });
        const sendResults = await Promise.allSettled(sendResultPromises);
        return res.status(200).json({ message: "Push notifications sent" });
    }
    catch (error) {
        // If user not found return 404 error
        if (error.statusCode === 404) {
            next(error);
        }
        else {
            // Other kind of DB error
            console.error(error.message);
            // Return a generic message to client
            const customError = {
                statusCode: 500,
                message: "Something went wrong",
            };
            return next(customError);
        }
    }
};
exports.postNotificationRouteController = postNotificationRouteController;
