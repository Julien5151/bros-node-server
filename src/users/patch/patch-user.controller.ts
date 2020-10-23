import { RequestHandler } from "express";

export const patchUserRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    const userId = req.params["id"];
    return res
        .status(200)
        .json({ message: `Patched user with id : ${userId}` });
};
