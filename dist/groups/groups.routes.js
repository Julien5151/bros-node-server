"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const partial_validation_errors_1 = require("../utils/middlewares/partial-validation-errors");
const validation_errors_1 = require("../utils/middlewares/validation-errors");
const enums_1 = require("../utils/types/enums");
const delete_group_controller_1 = require("./delete/delete-group.controller");
const get_groups_controller_1 = require("./get/get-groups.controller");
const patch_group_controller_1 = require("./patch/patch-group.controller");
const post_group_controller_1 = require("./post/post-group.controller");
exports.groupsRouter = express_1.Router();
// GET /groups
exports.groupsRouter.get("/", get_groups_controller_1.getGroupsRouteController);
// POST /groups
exports.groupsRouter.post("/", [express_validator_1.body("name").isLength({ min: 2 }), express_validator_1.body("type").matches(enums_1.groupTypeRegex)], validation_errors_1.validationErrorsController, post_group_controller_1.postGroupRouteController);
// PATCH /groups/:id
exports.groupsRouter.patch("/:id", [express_validator_1.body("name").isLength({ min: 2 }), express_validator_1.body("type").matches(enums_1.groupTypeRegex)], partial_validation_errors_1.partialValidationErrorsController, patch_group_controller_1.patchGroupRouteController);
// DELETE /groups/:id
exports.groupsRouter.delete("/:id", delete_group_controller_1.deleteGroupRouteController);
