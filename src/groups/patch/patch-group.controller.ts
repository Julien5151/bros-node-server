// import { RequestHandler } from "express";
// import { Group } from "../../models/group";
// import { SqlQueries } from "../../utils/database/sql-queries";
// import { SqlOperator } from "../../utils/types/enums";
// import { CustomError } from "../../utils/types/interfaces";
// import { GroupPatchRequest } from "./patch-group.types";

// export const patchGroupRouteController: RequestHandler = async (
//     req,
//     res,
//     next
// ) => {
//     // Extract data from body and group id from params
//     const reqBody = req.body as GroupPatchRequest;
//     const groupId = req.params["id"];
//     // Create field and values arrays
//     const fields: Array<string> = [];
//     const fieldValues: Array<any> = [];
//     // Fill arrays based on request content
//     for (const key in reqBody) {
//         // Unauthorized field
//         const customError: CustomError = {
//             statusCode: 400,
//             message: "Unauthorized field : ",
//         };
//         switch (key) {
//             case "name":
//                 fields.push("name");
//                 fieldValues.push(reqBody[key]);
//                 break;
//             case "type":
//                 fields.push("type");
//                 fieldValues.push(reqBody[key]);
//                 break;
//             default:
//                 // Unauthorized field name detected, return a 400
//                 customError.message += key;
//                 return next(customError);
//         }
//     }
//     // Update group in database
//     try {
//         const [rows] = await SqlQueries.update(
//             "friend_groups",
//             fields,
//             fieldValues,
//             ["id", SqlOperator["="], groupId]
//         );
//         if (rows.changedRows === 1) {
//             // Group updated successfully, return updated group
//             const [rows] = await SqlQueries.selectFrom(
//                 "friend_groups",
//                 undefined,
//                 ["id", SqlOperator["="], groupId]
//             );
//             // Removed password and role from response
//             const group = rows[0] as Group;
//             // Send successfull response
//             return res.status(200).json(group);
//         } else {
//             // Group not found
//             const customError: CustomError = {
//                 statusCode: 404,
//                 message: `Group with id (${groupId}) doesn't exist`,
//             };
//             next(customError);
//         }
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
