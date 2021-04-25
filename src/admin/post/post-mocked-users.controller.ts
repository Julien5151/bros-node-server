import { RequestHandler } from "express";
import { User } from "../../models/user";
import { MockedUsers } from "../../utils/mocked-data/users";
import bcrypt from "bcryptjs";
import { CustomError } from "../../utils/types/interfaces";

export const postMockedUsersRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Deep copy of original array
    const mockedUsers = JSON.parse(JSON.stringify(MockedUsers));
    // Create mocked user with hashed password in DB
    try {
        for (let i = 0; i < mockedUsers.length; i++) {
            // Use sync hashing as it's an admin only action
            mockedUsers[i].password = bcrypt.hashSync(
                mockedUsers[i].password,
                12
            );
            const newUser = new User({
                firstName: mockedUsers[i].firstName,
                lastName: mockedUsers[i].lastName,
                email: mockedUsers[i].email,
                zipcode: mockedUsers[i].zipcode,
                password: mockedUsers[i].password,
            });
            // Insert new user in DB
            await newUser.create();
        }
        // Users were created successfully
        return res.status(201).json({
            message: `${mockedUsers.length} mocked users successfully created`,
        });
    } catch (error) {
        // In case of DB error, log the error
        console.error(error.message);
        // Return a generic message to client
        const customError: CustomError = {
            statusCode: 500,
            message: "Something went wrong",
        };
        return next(customError);
    }
};
