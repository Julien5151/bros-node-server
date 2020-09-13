"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql_1 = __importDefault(require("mysql"));
exports.connection = mysql_1.default.createConnection({
    host: "localhost",
    user: "root",
    database: "bros-mysql-database",
    password: process.env.DEV_DB_PASSWORD,
});
exports.connection.connect((err) => {
    // If an error is returned, connection failed
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    // Otherwise, connection to DB is successfull
    console.log("connected as id " + exports.connection.threadId);
});
