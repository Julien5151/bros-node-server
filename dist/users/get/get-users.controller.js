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
const sql_queries_1 = require("../../utils/database/sql-queries");
exports.getUsersRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Select fields to extract
    const fieldToExtract = [
        "id",
        "first_name",
        "last_name",
        "email",
        "phone",
        "address",
        "zipcode",
        "created_at",
    ];
    try {
        // Extract rows from DB
        const [rows] = yield sql_queries_1.SqlQueries.selectFrom("users", fieldToExtract);
        // Cast and return the response
        const response = rows;
        return res.status(200).json(response);
    }
    catch (error) {
        // In case of SQL error, log the error
        console.error(error.message);
        // Return a generic message to client
        const customError = {
            statusCode: 500,
            message: "Something went wrong",
        };
        return next(customError);
    }
});
