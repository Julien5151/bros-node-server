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
            let hashedPassword = "";
            // Unauthorized field
            const customError: CustomError = {
                statusCode: 400,
                message: "Unauthorized field : ",
            };
            switch (key) {
                case "firstName":
                    patchedUser.firstName = reqBody[key] as string;
                    break;
                case "lastName":
                    patchedUser.lastName = reqBody[key] as string;
                    break;
                case "email":
                    patchedUser.email = reqBody[key] as string;
                    break;
                case "phone":
                    patchedUser.phone = reqBody[key] as string;
                    break;
                case "address":
                    patchedUser.address = reqBody[key] as string;
                    break;
                case "zipcode":
                    patchedUser.zipcode = reqBody[key] as number;
                    break;
                case "password":
                    // Hash password using bcrypt
                    hashedPassword = await bcrypt.hash(
                        reqBody[key] as string,
                        12
                    );
                    patchedUser.password = hashedPassword as string;
                    break;
                default:
                    // Unauthorized field name detected, return a 400
                    customError.message += key;
                    return next(customError);
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
