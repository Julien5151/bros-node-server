"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsRouter = void 0;
const express_1 = require("express");
const errors_1 = require("../controllers/errors");
exports.errorsRouter = express_1.Router();
// POST /errors/throw
exports.errorsRouter.post("/throw", errors_1.errorsRouteController);
