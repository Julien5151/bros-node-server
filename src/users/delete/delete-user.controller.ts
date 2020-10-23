import { RequestHandler } from "express";

export const deleteUserRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    return res.status(200).json({ message: "Deleted !" });
};
