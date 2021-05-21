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
exports.postGroupRouteController = void 0;
const postGroupRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract group type
    const groupType = req.body.type;
    // Extract user initiating group request
    const user = res.locals.user;
    try {
        // Fetch all group data from both user and friend_groups tables
        return res.status(200).json({ message: "You group was created" });
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
exports.postGroupRouteController = postGroupRouteController;
