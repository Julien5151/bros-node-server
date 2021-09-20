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
exports.getUsersRouteController = void 0;
const db_connection_1 = require("../../utils/database/db-connection");
const enums_1 = require("../../utils/types/enums");
const user_1 = require("../../models/user");
const getUsersRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract data from DB
        const usersData = yield db_connection_1.db
            .collection(enums_1.MongoCollection.users)
            .find()
            .toArray();
        // Create user plain objects array based on data
        const users = usersData.map((userData) => new user_1.User(userData).getPlainObject());
        return res.status(200).json(users);
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
exports.getUsersRouteController = getUsersRouteController;
