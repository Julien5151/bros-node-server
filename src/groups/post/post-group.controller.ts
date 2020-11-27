import { RequestHandler } from "express";
import { Group } from "../../models/group";
import { User } from "../../models/user";
import { SqlQueries } from "../../utils/database/sql-queries";
import { GroupType, GroupSize, SqlOperator } from "../../utils/types/enums";
import { CustomError } from "../../utils/types/interfaces";
import { GroupPostRequest } from "./post-group.types";

export const postGroupRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body
    const reqBody = req.body as GroupPostRequest;
    try {
        // Search for users living in the same area
        const fieldToExtract = ["id", "first_name", "last_name"];
        // Extract rows from DB
        const [rows] = await SqlQueries.selectFrom("users", fieldToExtract, [
            "zipcode",
            SqlOperator["="],
            reqBody.zipcode,
        ]);
        const usersFound = rows as Array<User>;
        // Check if there are enough people to make a group of the requested type
        if (
            (reqBody.type === GroupType.friends &&
                usersFound.length >= GroupSize.friends) ||
            (reqBody.type === GroupType.himym &&
                usersFound.length >= GroupSize.himym)
        ) {
            // Create the group
            const newGroup: Group = {
                name:
                    reqBody.type === GroupType.friends
                        ? "New group - Friends"
                        : "New group - How I Met Your Mother",
                type: reqBody.type,
                createdAt: new Date(),
            };
            // Insert group into DB
            const [insertResponse] = await SqlQueries.insertInto(
                "friend_groups",
                ["name", "type", "created_at"],
                [[newGroup.name, newGroup.type, newGroup.createdAt]]
            );
            console.log(usersFound);
        } else {
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
