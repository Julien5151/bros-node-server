"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaController = void 0;
const path_1 = __importDefault(require("path"));
const spaController = (req, res, next) => {
    return res
        .status(200)
        .sendFile(path_1.default.join(__dirname, "../../public/index.html"));
};
exports.spaController = spaController;
