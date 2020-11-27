import { RequestHandler } from "express";

export const postMockedUsersRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    return res.status(200).json({ message: "Mocked users created" });
};
