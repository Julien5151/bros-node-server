import { RequestHandler } from "express";
import { CustomRequest } from "../../utils/types/interfaces";

export const postMockedUsersRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    console.log(res.locals.userId);
    console.log(res.locals.userRole);
    return res.status(200).json({ message: "Mocked users created" });
};
