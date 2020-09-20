import mysql, { PoolOptions } from "mysql2";

// Pool configuration object
// Casting is mandatory as PoolOptions definition doesn't allow "host" key
// Which seems to be an error as it's used in the official documentation
const poolOptions = {
    host: "localhost",
    user: "root",
    database: "bros-mysql-database",
    password: process.env.DEV_DB_PASSWORD,
} as PoolOptions;

export const connectionPool = mysql.createPool(poolOptions).promise();
