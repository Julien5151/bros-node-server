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
exports.deleteAllUsersRouteController = void 0;
const user_1 = require("../../models/user");
const deleteAllUsersRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Remove all user documents
        const deleteAllResponse = yield user_1.User.deleteAll();
        // Users can't be locked at the moment
        // To be refactored when they will be included in groups
        const deleteResponse = {
            deleted: (_a = deleteAllResponse.deletedCount) !== null && _a !== void 0 ? _a : 0,
            locked: 0,
        };
        return res.status(200).json(deleteResponse);
    }
    catch (error) {
        // In case of DB error, log the error
        console.error(error.message);
        // Return a generic message to client
        const customError = {
            statusCode: 500,
            message: "Something went wrong",
        };
        return next(customError);
    }
});
exports.deleteAllUsersRouteController = deleteAllUsersRouteController;
