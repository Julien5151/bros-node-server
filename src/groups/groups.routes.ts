import { Router } from "express";
import { body } from "express-validator";
import { validationErrorsController } from "../utils/middlewares/validation-errors";
import { GroupType } from "../utils/types/enums";
import { postGroupRouteController } from "./post/post-group.controller";

export const groupsRouter = Router();

// // GET /groups
// groupsRouter.get("/", getGroupsRouteController);

// POST /groups
groupsRouter.post(
    "/",
    [body("type").isIn([GroupType.beer, GroupType.coffee])],
    validationErrorsController,
    postGroupRouteController
);

// // PATCH /groups/:id
// groupsRouter.patch(
//     "/:id",
//     [
//         body("zipcode").isInt({ min: 1, max: 99 }),
//         body("type").matches(groupTypeRegex),
//     ],
//     partialValidationErrorsController,
//     patchGroupRouteController
// );

// // DELETE /groups/:id
// groupsRouter.delete("/:id", deleteGroupRouteController);
