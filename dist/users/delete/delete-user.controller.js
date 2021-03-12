"use strict";
// import { RequestHandler } from "express";
// import { SqlQueries } from "../../utils/database/sql-queries";
// import { SqlOperator } from "../../utils/types/enums";
// import { CustomError } from "../../utils/types/interfaces";
// import { UserDeleteResponse } from "./delete-user.types";
// export const deleteUserRouteController: RequestHandler = async (
//     req,
//     res,
//     next
// ) => {
//     // Extract user id from params
//     const userId = req.params["id"];
//     try {
//         const [rows] = await SqlQueries.deleteFrom("users", [
//             "id",
//             SqlOperator["="],
//             userId,
//         ]);
//         // Users can't be locked at the moment
//         // To be refactored when they will be included in groups
//         const deleteResponse: UserDeleteResponse = {
//             deleted: rows.affectedRows,
//             locked: 0,
//         };
//         return res.status(200).json(deleteResponse);
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
