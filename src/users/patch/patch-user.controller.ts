// import { RequestHandler } from "express";
// import bcrypt from "bcryptjs";
// import { SqlQueries } from "../../utils/database/sql-queries";
// import { SqlOperator } from "../../utils/types/enums";
// import { UserPatchRequest } from "./patch-user.types";
// import { CustomError } from "../../utils/types/interfaces";
// import { User } from "../../models/user";

// export const patchUserRouteController: RequestHandler = async (
//     req,
//     res,
//     next
// ) => {
//     // Extract data from body and user id from params
//     const reqBody = req.body as UserPatchRequest;
//     const userId = req.params["id"];
//     // Create field and values arrays
//     const fields: Array<string> = [];
//     const fieldValues: Array<any> = [];
//     // Fill arrays based on request content
//     for (const key in reqBody) {
//         let hashedPassword = "";
//         // Unauthorized field
//         const customError: CustomError = {
//             statusCode: 400,
//             message: "Unauthorized field : ",
//         };
//         switch (key) {
//             case "firstName":
//                 fields.push("first_name");
//                 fieldValues.push(reqBody[key]);
//                 break;
//             case "lastName":
//                 fields.push("last_name");
//                 fieldValues.push(reqBody[key]);
//                 break;
//             case "email":
//                 fields.push("email");
//                 fieldValues.push(reqBody[key]);
//                 break;
//             case "phone":
//                 fields.push("phone");
//                 fieldValues.push(reqBody[key]);
//                 break;
//             case "address":
//                 fields.push("address");
//                 fieldValues.push(reqBody[key]);
//                 break;
//             case "zipcode":
//                 fields.push("zipcode");
//                 fieldValues.push(reqBody[key]);
//                 break;
//             case "password":
//                 fields.push("password");
//                 // Hash password using bcrypt
//                 hashedPassword = await bcrypt.hash(reqBody[key] as string, 12);
//                 fieldValues.push(hashedPassword);
//                 break;
//             default:
//                 // Unauthorized field name detected, return a 400
//                 customError.message += key;
//                 return next(customError);
//         }
//     }
//     // Update user in database
//     try {
//         const [rows] = await SqlQueries.update("users", fields, fieldValues, [
//             "id",
//             SqlOperator["="],
//             userId,
//         ]);
//         if (rows.changedRows === 1) {
//             // User updated successfully, return updated user
//             const [rows] = await SqlQueries.selectFrom("users", undefined, [
//                 "id",
//                 SqlOperator["="],
//                 userId,
//             ]);
//             // Removed password and role from response
//             const user = rows[0] as User;
//             delete user.password;
//             delete user.role;
//             // Send successfull response
//             return res.status(200).json(user);
//         } else {
//             // User not found
//             const customError: CustomError = {
//                 statusCode: 404,
//                 message: `User with id (${userId}) doesn't exist`,
//             };
//             next(customError);
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
