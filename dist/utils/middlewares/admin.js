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
exports.checkAdminRoleController = void 0;
const enums_1 = require("../types/enums");
// This middleware should always be used after auth middleware because it relies
// on user role to be set in response locals
const checkAdminRoleController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract role
    const userRole = res.locals.userRole;
    // If user if admin
    if (userRole === enums_1.UserRole.admin) {
        // Proceed to next middlewares
        next();
    }
    else {
        // Throw 403 error
        const verifyError = {
            statusCode: 403,
            message: "Insufficient permissions",
        };
        next(verifyError);
    }
});
exports.checkAdminRoleController = checkAdminRoleController;
