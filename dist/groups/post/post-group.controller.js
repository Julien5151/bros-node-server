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
    try {
        // Search for users living in the same area
        const fieldToExtract = ["id", "first_name", "last_name"];
        // Extract rows from DB
        const [rows] = yield sql_queries_1.SqlQueries.selectFrom("users", fieldToExtract, [
            "zipcode",
            enums_1.SqlOperator["="],
            reqBody.zipcode,
        ]);
        const usersFound = rows;
        // Check if there are enough people to make a group of the requested type
        if ((reqBody.type === enums_1.GroupType.friends &&
            usersFound.length >= enums_1.GroupSize.friends) ||
            (reqBody.type === enums_1.GroupType.himym &&
                usersFound.length >= enums_1.GroupSize.himym)) {
            // Create the group
            const newGroup = {
                name: reqBody.type === enums_1.GroupType.friends
                    ? "New group - Friends"
                    : "New group - How I Met Your Mother",
                type: reqBody.type,
                createdAt: new Date(),
            };
            // Insert group into DB
            const [insertResponse] = yield sql_queries_1.SqlQueries.insertInto("friend_groups", ["name", "type", "created_at"], [[newGroup.name, newGroup.type, newGroup.createdAt]]);
            console.log(usersFound);
        }
        else {
            // Respond with a 404, not enough people
            return res
                .status(404)
                .json({ message: "Not enough people found in your area" });
        }
        // // If group is created successfully, get its id
        // const createdGroupId = insertResponse.insertId;
        // // Fetch created group and return it as a response
        // const [rows] = await SqlQueries.selectFrom("friend_groups", undefined, [
        //     "id",
        //     SqlOperator["="],
        //     createdGroupId,
        // ]);
        // const createdGroup = rows[0] as Group;
        // If group successfully created, return the created group
        return res.status(201).json({ message: "You group was created" });
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
