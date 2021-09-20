"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = require("express");
const get_profile_controller_1 = require("./get/get-profile.controller");
exports.profileRouter = express_1.Router();
// GET /profile
exports.profileRouter.get("/", get_profile_controller_1.getProfileRouteController);
