"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const get_users_controller_1 = require("./get/get-users.controller");
const patch_user_controller_1 = require("./patch/patch-user.controller");
exports.usersRouter = express_1.Router();
// PATCH /users/:id
exports.usersRouter.patch("/:id", patch_user_controller_1.patchUserRouteController);
// GET /users
exports.usersRouter.get("/", get_users_controller_1.getUsersRouteController);
