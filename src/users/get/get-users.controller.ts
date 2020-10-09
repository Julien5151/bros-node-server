import { RequestHandler } from "express";

export const getUsersRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    return res.status(200).json({ message: "Hey !" });
};
