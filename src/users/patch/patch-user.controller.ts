import { RequestHandler } from "express";
import { UserPatchRequest } from "./patch-user.types";

export const patchUserRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body and user id from params
    const reqBody = req.body as UserPatchRequest;
    const userId = req.params["id"];
    return res
        .status(200)
        .json({ message: `Patched user with id : ${userId}` });
};
