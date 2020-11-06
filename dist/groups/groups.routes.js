"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validation_errors_1 = require("../utils/middlewares/validation-errors");
const enums_1 = require("../utils/types/enums");
const get_groups_controller_1 = require("./get/get-groups.controller");
const post_group_controller_1 = require("./post/post-group.controller");
exports.groupsRouter = express_1.Router();
// GET /groups
exports.groupsRouter.get("/", get_groups_controller_1.getGroupsRouteController);
// POST /groups
exports.groupsRouter.post("/", [express_validator_1.body("name").isLength({ min: 2 }), express_validator_1.body("type").matches(enums_1.groupTypeRegex)], validation_errors_1.validationErrorsController, post_group_controller_1.postGroupRouteController);
// PATCH /groups/:id
exports.groupsRouter.patch("/:id");
// DELETE /groups/:id
exports.groupsRouter.delete("/:id");
