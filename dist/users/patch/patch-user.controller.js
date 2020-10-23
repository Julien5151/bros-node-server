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
exports.patchUserRouteController = void 0;
exports.patchUserRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body and user id from params
    const reqBody = req.body;
    const userId = req.params["id"];
    // SqlQueries.update(
    //     "users",
    //     ["zipcode", "phone"],
    //     ["51350", "0101010101"],
    //     ["id", SqlOperator["="], 2]
    // );
    return res
        .status(200)
        .json({ message: `Patched user with id : ${userId}` });
});
