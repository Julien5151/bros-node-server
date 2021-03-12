// import { RequestHandler } from "express";
// import bcrypt from "bcryptjs";
// import jwt, { Secret } from "jsonwebtoken";
// import { User } from "../../models/user";
// import { CustomError } from "../../utils/types/interfaces";
// import { SigninRequest, SigninResponse } from "./signin.types";
// import { SqlQueries } from "../../utils/database/sql-queries";
// import { SqlOperator } from "../../utils/types/enums";

// export const signinRouteController: RequestHandler = async (req, res, next) => {
//     // Extract data from body
//     const reqBody = req.body as SigninRequest;
//     // Extract data and email
//     const email = reqBody.email;
//     const password = reqBody.password;
//     try {
//         const [rows] = await SqlQueries.selectFrom("users", undefined, [
//             "email",
//             SqlOperator["="],
//             email,
//         ]);
//         if (rows.length > 0) {
//             // User found
//             // Extract user from mysql response
//             const user = rows[0] as User;
//             // Compare passwords
//             const isPasswordCorrect = await bcrypt.compare(
//                 password,
//                 user.password as string
//             );
//             // If password is correct, generate a token and return it to the user
//             if (isPasswordCorrect) {
//                 // Generate token with user data
//                 const token = jwt.sign(
//                     {
//                         id: user.id,
//                         email: user.email,
//                     },
//                     process.env.TOKEN_SECRET as Secret,
//                     { expiresIn: "1h" }
//                 );
//                 // Create response object
//                 const response: SigninResponse = {
//                     token: token,
//                 };
//                 return res.status(200).json(response);
//             } else {
//                 // Create custom error message from mysql error
//                 const error: CustomError = {
//                     statusCode: 401,
//                     message: "Email or password is incorrect",
//                 };
//                 next(error);
//             }
//         } else {
//             // Create custom error message from mysql error
//             const error: CustomError = {
//                 statusCode: 404,
//                 message: "User not found",
//             };
//             next(error);
//         }
//     } catch (error) {
//         // In case of SQL error, log the error
//         console.error(error.message);
//         // Return a generic message to client
//         const customError: CustomError = {
//             statusCode: 500,
//             message: "Something went wrong",
//         };
//         return next(customError);
//     }
// };
