import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { UserPatchRequest } from "./patch-user.types";
import { CustomError } from "../../utils/types/interfaces";
import { User } from "../../models/user";

export const patchUserRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body and user id from params
    const reqBody = req.body as UserPatchRequest;
    const userId = req.params["id"];
    try {
        // Load user from DB
        const patchedUser = await User.load(userId);
        // Fill arrays based on request content
        for (const key in reqBody) {
            // For password key, needs to be hashed
            if (key === "password") {
                // Hash password using bcrypt
                const hashedPassword = await bcrypt.hash(
                    reqBody[key] as string,
                    12
                );
                patchedUser.password = hashedPassword as string;
            } else {
                // We know key will be of the relevant type thanks to validationErrorsController
                // as never is a weird typescript typing but is necessary
                patchedUser[key as keyof User] = reqBody[
                    key as keyof UserPatchRequest
                ] as never;
            }
        }
        // Update user in DB
        await patchedUser.update();
        // If user successfully patched, return the updated user
        return res.status(201).json(patchedUser.getPlainObject());
    } catch (error) {
        // If user not found return 404 error
        if (error.statusCode === 404) {
            next(error);
        } else {
            // Other kind of DB error
            console.error(error.message);
            // Return a generic message to client
            const customError: CustomError = {
                statusCode: 500,
                message: "Something went wrong",
            };
            return next(customError);
        }
    }
};
