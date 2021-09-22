import { RequestHandler } from "express";

export const postSubscriptionRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body
    const reqBody = req.body;
    return res.status(200).json({ message: "new subscription saved !" });
};
