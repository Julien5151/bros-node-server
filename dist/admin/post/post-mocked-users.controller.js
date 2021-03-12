"use strict";
// import { RequestHandler } from "express";
// import { User } from "../../models/user";
// import { MockedUsers } from "../../utils/mocked-data/users";
// import { UserRole } from "../../utils/types/enums";
// import bcrypt from "bcryptjs";
// import { CustomError } from "../../utils/types/interfaces";
// import { SqlQueries } from "../../utils/database/sql-queries";
// export const postMockedUsersRouteController: RequestHandler = async (
//     req,
//     res,
//     next
// ) => {
//     // Extract static mocked data
//     const mockedUsers: Array<User> = MockedUsers;
//     // Add password
//     try {
//         // Array of values to be inserted into DB
//         const userValuesArray: Array<Array<any>> = [];
//         // Loop on each mocked user to hash password and add date and role
//         mockedUsers.forEach((user) => {
//             // Update mocked user data
//             const hashedPassword = bcrypt.hashSync(user.password as string, 12);
//             user.password = hashedPassword;
//             user.role = UserRole.visitor;
//             user.createdAt = new Date();
//             // Add each array of value to be inserted into DB
//             userValuesArray.push(Object.values(user));
//         });
//         // Insert new user in DB
//         const [insertResponse] = await SqlQueries.insertInto(
//             "users",
//             [
//                 "first_name",
//                 "last_name",
//                 "password",
//                 "email",
//                 "phone",
//                 "zipcode",
//                 "role",
//                 "created_at",
//             ],
//             userValuesArray
//         );
//         // Users were created successfully
//         return res.status(201).json({
//             message: `${insertResponse.affectedRows} mocked users created`,
//         });
//     } catch (error) {
//         // In case of DB error, log the error
//         console.error(error.message);
//         // Return a generic message to client
//         const customError: CustomError = {
//             statusCode: 500,
//             message: "Something went wrong",
//         };
//         return next(customError);
//     }
// };
