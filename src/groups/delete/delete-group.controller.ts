// import { RequestHandler } from "express";
// import { SqlQueries } from "../../utils/database/sql-queries";
// import { SqlOperator } from "../../utils/types/enums";
// import { CustomError } from "../../utils/types/interfaces";
// import { GroupDeleteResponse } from "./delete-group.types";

// export const deleteGroupRouteController: RequestHandler = async (
//     req,
//     res,
//     next
// ) => {
//     // Extract group id from params
//     const groupId = req.params["id"];
//     try {
//         const [rows] = await SqlQueries.deleteFrom("friend_groups", [
//             "id",
//             SqlOperator["="],
//             groupId,
//         ]);
//         // Groups can't be locked at the moment
//         // To be refactored when they will be filled with users
//         const deleteResponse: GroupDeleteResponse = {
//             deleted: rows.affectedRows,
//             locked: 0,
//         };
//         return res.status(200).json(deleteResponse);
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
