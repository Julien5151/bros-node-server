"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchGroupRouteController = void 0;
const sql_queries_1 = require("../../utils/database/sql-queries");
const enums_1 = require("../../utils/types/enums");
exports.patchGroupRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body and group id from params
    const reqBody = req.body;
    const groupId = req.params["id"];
    // Create field and values arrays
    const fields = [];
    const fieldValues = [];
    // Fill arrays based on request content
    for (const key in reqBody) {
        // Unauthorized field
        const customError = {
            statusCode: 400,
            message: "Unauthorized field : ",
        };
        switch (key) {
            case "name":
                fields.push("name");
                fieldValues.push(reqBody[key]);
                break;
            case "type":
                fields.push("type");
                fieldValues.push(reqBody[key]);
                break;
            default:
                // Unauthorized field name detected, return a 400
                customError.message += key;
                return next(customError);
        }
    }
    // Update group in database
    try {
        const [rows] = yield sql_queries_1.SqlQueries.update("friend_groups", fields, fieldValues, ["id", enums_1.SqlOperator["="], groupId]);
        if (rows.changedRows === 1) {
            // Group updated successfully, return updated group
            const [rows] = yield sql_queries_1.SqlQueries.selectFrom("friend_groups", undefined, ["id", enums_1.SqlOperator["="], groupId]);
            // Removed password and role from response
            const group = rows[0];
            // Send successfull response
            return res.status(200).json(group);
        }
        else {
            // Group not found
            const customError = {
                statusCode: 404,
                message: `Group with id (${groupId}) doesn't exist`,
            };
            next(customError);
        }
    }
    catch (error) {
        // In case of SQL error, log the error
        console.error(error.message);
        // Return a generic message to client
        const customError = {
            statusCode: 500,
            message: "Something went wrong",
        };
        return next(customError);
    }
});
