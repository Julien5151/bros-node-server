"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupsRouter = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validation_errors_1 = require("../utils/middlewares/validation-errors");
const enums_1 = require("../utils/types/enums");
const post_group_controller_1 = require("./post/post-group.controller");
exports.groupsRouter = express_1.Router();
// POST /groups
exports.groupsRouter.post("/", [express_validator_1.body("name").isLength({ min: 2 }), express_validator_1.body("type").matches(enums_1.groupTypeRegex)], validation_errors_1.validationErrorsController, post_group_controller_1.postGroupRouteController);
