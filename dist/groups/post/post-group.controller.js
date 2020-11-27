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
exports.postGroupRouteController = void 0;
const sql_queries_1 = require("../../utils/database/sql-queries");
const enums_1 = require("../../utils/types/enums");
exports.postGroupRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body
    const reqBody = req.body;
    // Create new group object
    const newGroup = {
        name: reqBody.name,
        type: reqBody.type,
        createdAt: new Date(),
    };
    try {
        // Insert group into DB
        const [insertResponse] = yield sql_queries_1.SqlQueries.insertInto("friend_groups", ["name", "type", "created_at"], [[newGroup.name, newGroup.type, newGroup.createdAt]]);
        // If group is created successfully, get its id
        const createdGroupId = insertResponse.insertId;
        // Fetch created group and return it as a response
        const [rows] = yield sql_queries_1.SqlQueries.selectFrom("friend_groups", undefined, [
            "id",
            enums_1.SqlOperator["="],
            createdGroupId,
        ]);
        const createdGroup = rows[0];
        // If group successfully created, return the created group
        return res.status(201).json(createdGroup);
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
