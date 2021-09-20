"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileRouteController = void 0;
const enums_1 = require("../../utils/types/enums");
const getProfileRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if we are in dev or production
    if (res.locals.userId === enums_1.SpecialUsers["dev-admin"]) {
        // Throw an error, dev-admin doesn't have a profile
        const customError = {
            statusCode: 400,
            message: "Dev admin doesn't have a valid profile",
        };
        return next(customError);
    }
    else {
        // Get user object stored locals after login
        const user = res.locals.user;
        // If user successfully created, return the created user
        return res.status(200).json(user.getPlainObject());
    }
});
exports.getProfileRouteController = getProfileRouteController;
