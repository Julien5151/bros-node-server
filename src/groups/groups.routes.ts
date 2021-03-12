import { Router } from "express";
import { body } from "express-validator";

export const groupsRouter = Router();

// // GET /groups
// groupsRouter.get("/", getGroupsRouteController);

// // POST /groups
// groupsRouter.post(
//     "/",
//     [
//         body("zipcode").isInt({ min: 1, max: 99 }),
//         body("type").matches(groupTypeRegex),
//     ],
//     validationErrorsController,
//     postGroupRouteController
// );

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
