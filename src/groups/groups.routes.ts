import { Router } from "express";
import { body } from "express-validator";
import { partialValidationErrorsController } from "../utils/middlewares/partial-validation-errors";
import { validationErrorsController } from "../utils/middlewares/validation-errors";
import { groupTypeRegex } from "../utils/types/enums";
import { deleteGroupRouteController } from "./delete/delete-group.controller";
import { getGroupsRouteController } from "./get/get-groups.controller";
import { patchGroupRouteController } from "./patch/patch-group.controller";
import { postGroupRouteController } from "./post/post-group.controller";

export const groupsRouter = Router();

// GET /groups
groupsRouter.get("/", getGroupsRouteController);

// POST /groups
groupsRouter.post(
    "/",
    [body("name").isLength({ min: 2 }), body("type").matches(groupTypeRegex)],
    validationErrorsController,
    postGroupRouteController
);

// PATCH /groups/:id
groupsRouter.patch(
    "/:id",
    [body("name").isLength({ min: 2 }), body("type").matches(groupTypeRegex)],
    partialValidationErrorsController,
    patchGroupRouteController
);

// DELETE /groups/:id
groupsRouter.delete("/:id", deleteGroupRouteController);
