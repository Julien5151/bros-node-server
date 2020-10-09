"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const get_users_controller_1 = require("./get/get-users.controller");
exports.usersRouter = express_1.Router();
// GET /users
exports.usersRouter.get("/", get_users_controller_1.getUsersRouteController);
