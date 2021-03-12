// import { RequestHandler } from "express";
// import { Group } from "../../models/group";
// import { SqlQueries } from "../../utils/database/sql-queries";
// import { CustomError } from "../../utils/types/interfaces";
// import { GetGroupsResponse } from "./get-groups.types";

// export const getGroupsRouteController: RequestHandler = async (
//     req,
//     res,
//     next
// ) => {
//     // Select fields to extract
//     const fieldToExtract = ["id", "name", "type", "created_at"];
//     try {
//         // Extract rows from DB
//         const [rows] = await SqlQueries.selectFrom(
//             "friend_groups",
//             fieldToExtract
//         );
//         // Cast and return the response
//         const response: GetGroupsResponse = rows as Array<Group>;
//         return res.status(200).json(response);
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
