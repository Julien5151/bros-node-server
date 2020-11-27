"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = require("express");
const delete_all_users_controller_1 = require("./delete/delete-all-users.controller");
const post_mocked_users_controller_1 = require("./post/post-mocked-users.controller");
exports.adminRouter = express_1.Router();
// POST /create-mocked-users
exports.adminRouter.post("/create-mocked-users", post_mocked_users_controller_1.postMockedUsersRouteController);
// DELETE /users
exports.adminRouter.delete("/users", delete_all_users_controller_1.deleteAllUsersRouteController);
