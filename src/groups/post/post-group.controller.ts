import { RequestHandler } from "express";
import { Group } from "../../models/group";
import { SqlQueries } from "../../utils/database/sql-queries";
import { SqlOperator } from "../../utils/types/enums";
import { CustomError } from "../../utils/types/interfaces";
import { GroupPostRequest } from "./post-group.types";

export const postGroupRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body
    const reqBody = req.body as GroupPostRequest;
    // Create new group object
    const newGroup: Group = {
        name: reqBody.name,
        type: reqBody.type,
        createdAt: new Date(),
    };
    try {
        // Insert group into DB
        const [insertResponse] = await SqlQueries.insertInto(
            "friend_groups",
            ["name", "type", "created_at"],
            [newGroup.name, newGroup.type, newGroup.createdAt]
        );
        // If group is created successfully, get its id
        const createdGroupId = insertResponse.insertId;
        // Fetch created group and return it as a response
        const [rows] = await SqlQueries.selectFrom("friend_groups", undefined, [
            "id",
            SqlOperator["="],
            createdGroupId,
        ]);
        const createdGroup = rows[0] as Group;
        // If group successfully created, return the created group
        return res.status(201).json(createdGroup);
    } catch (error) {
        // In case of SQL error, log the error
        console.error(error.message);
        // Return a generic message to client
        const customError: CustomError = {
            statusCode: 500,
            message: "Something went wrong",
        };
        return next(customError);
    }
};
