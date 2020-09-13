import mysql, { MysqlError } from "mysql";

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "bros-mysql-database",
    password: process.env.DEV_DB_PASSWORD,
});

connection.connect((err: MysqlError) => {
    // If an error is returned, connection failed
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    // Otherwise, connection to DB is successfull
    console.log("connected as id " + connection.threadId);
});
