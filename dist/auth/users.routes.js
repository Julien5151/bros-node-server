"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_controllers_1 = require("./users.controllers");
exports.usersRouter = express_1.Router();
// DELETE /users/userId
exports.usersRouter.delete("/:id", users_controllers_1.deleteUsersRouteController);
// POST /users
exports.usersRouter.post("/", users_controllers_1.postUsersRouteController);
