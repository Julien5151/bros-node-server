"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPool = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
// Pool configuration object
// Casting is mandatory as PoolOptions definition doesn't allow "host" key
// Which seems to be an error as it's used in the official documentation
const poolOptions = {
    host: "localhost",
    user: "root",
    database: "bros-mysql-database",
    password: process.env.DEV_DB_PASSWORD,
};
exports.connectionPool = mysql2_1.default.createPool(poolOptions).promise();
