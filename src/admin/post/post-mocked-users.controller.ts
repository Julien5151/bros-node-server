import { RequestHandler } from "express";
import { CustomRequest } from "../../utils/types/interfaces";

export const postMockedUsersRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Type request using custom interface
    const reqCustom = req as CustomRequest;
    console.log(reqCustom.userId);
    console.log(reqCustom.userRole);
    return res.status(200).json({ message: "Mocked users created" });
};
