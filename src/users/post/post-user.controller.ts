import { RequestHandler } from "express";
import { CustomError } from "../../utils/types/interfaces";
import { UserPostRequest } from "./post-user.types";
import bcrypt from "bcryptjs";
import { User } from "../../models/user";

export const postUserRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body
    const reqBody = req.body as UserPostRequest;
    // Check if passwords match
    if (reqBody.password === reqBody.confirmedPassword) {
        // Add password
        try {
            // Hash password using bcrypt
            const hashedPassword = await bcrypt.hash(reqBody.password, 12);
            // Create new user object mandatory fields (visitor at signup)
            const newUser = new User({
                firstName: reqBody.firstName,
                lastName: reqBody.lastName,
                email: reqBody.email,
                zipcode: reqBody.zipcode,
                password: hashedPassword,
            });
            //
            if (reqBody.phone) {
                newUser.phone = reqBody.phone;
            }
            if (reqBody.address) {
                newUser.address = reqBody.address;
            }
            // Insert new user in DB
            await newUser.create();
            // If user successfully created, return the created user
            return res.status(201).json(newUser.getPlainObject());
        } catch (error) {
            const customError: CustomError = {
                statusCode: 500,
                message: "Something went wrong",
            };
            if (error.code === 11000) {
                // Duplicate email (error code 11000)
                customError.statusCode = 409;
                customError.message = "This user already exists";
            }
            return next(customError);
        }
    } else {
        // If passwords don't match, send 400 error
        const error: CustomError = {
            statusCode: 400,
            message: "Passwords don't match",
        };
        // Pass error to error handler middleware
        return next(error);
    }
};
