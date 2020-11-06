import { RequestHandler } from "express";
import { SqlQueries } from "../../utils/database/sql-queries";
import { SqlOperator, UserRole } from "../../utils/types/enums";
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
        // Create new user object mandatory fields (visitor at signup)
        const newUser: User = {
            firstName: reqBody.firstName,
            lastName: reqBody.lastName,
            email: reqBody.email,
            zipcode: reqBody.zipcode,
            role: UserRole.visitor,
            createdAt: new Date(),
        };
        // Add optional fields (if provided)
        const optionalFieldNames = [];
        const optionalFieldValues = [];
        //
        if (reqBody.phone) {
            newUser.phone = reqBody.phone;
            optionalFieldNames.push("phone");
            optionalFieldValues.push(reqBody.phone);
        }
        if (reqBody.address) {
            newUser.address = reqBody.address;
            optionalFieldNames.push("address");
            optionalFieldValues.push(reqBody.address);
        }
        // Add password
        try {
            // Hash password using bcrypt
            const hashedPassword = await bcrypt.hash(reqBody.password, 12);
            // Insert new user in DB
            const [insertResponse] = await SqlQueries.insertInto(
                "users",
                [
                    "first_name",
                    "last_name",
                    "email",
                    "password",
                    "zipcode",
                    "role",
                    "created_at",
                    ...optionalFieldNames,
                ],
                [
                    newUser.firstName,
                    newUser.lastName,
                    newUser.email,
                    hashedPassword,
                    newUser.zipcode,
                    newUser.role,
                    newUser.createdAt,
                    ...optionalFieldValues,
                ]
            );
            // If user is created successfully, get its id
            const createdUserId = insertResponse.insertId;
            // Fetch created user and return it as a response
            const [rows] = await SqlQueries.selectFrom("users", undefined, [
                "id",
                SqlOperator["="],
                createdUserId,
            ]);
            const createdUser = rows[0] as User;
            // Remove password and role field from response
            delete createdUser.password;
            delete createdUser.role;
            // If user successfully created, return the created user
            return res.status(201).json(createdUser);
        } catch (error) {
            // In case of SQL error, log the error
            console.error(error.message);
            // Return a generic message to client
            const customError: CustomError = {
                statusCode: 500,
                message: "Something went wrong",
            };
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
