import { RequestHandler } from "express";
import { SqlQueries } from "../../utils/database/sql-queries";
import { SqlOperator } from "../../utils/types/enums";
import { UserPatchRequest } from "./patch-user.types";

export const patchUserRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body and user id from params
    const reqBody = req.body as UserPatchRequest;
    const userId = req.params["id"];
    // SqlQueries.update(
    //     "users",
    //     ["zipcode", "phone"],
    //     ["51350", "0101010101"],
    //     ["id", SqlOperator["="], 2]
    // );
    return res
        .status(200)
        .json({ message: `Patched user with id : ${userId}` });
};
