import { RequestHandler } from "express";
import { CustomError } from "../../utils/types/interfaces";
import { User } from "../../models/user";
import { SpecialUsers } from "../../utils/types/enums";

export const getProfileRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Check if we are in dev or production
    if (res.locals.userId === SpecialUsers["dev-admin"]) {
        // Throw an error, dev-admin doesn't have a profile
        const customError: CustomError = {
            statusCode: 400,
            message: "Dev admin doesn't have a valid profile",
        };
        return next(customError);
    } else {
        // Get user object stored locals after login
        const user = res.locals.user as User;
        // If user successfully created, return the created user
        return res.status(200).json(user.getPlainObject());
    }
};
