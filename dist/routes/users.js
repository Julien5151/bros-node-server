"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_1 = require("../controllers/users");
exports.usersRouter = express_1.Router();
// POST /users
exports.usersRouter.post("", users_1.postUsersRouteController);
