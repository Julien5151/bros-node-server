"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = exports.db = void 0;
const mongodb_1 = require("mongodb");
const dbUri = process.env.DB_URL;
const mongoClient = new mongodb_1.MongoClient(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
async function connectDb() {
    return mongoClient.connect().then((mongoClient) => {
        // Set DB variable after successfull connection
        exports.db = mongoClient.db(process.env.DB_NAME);
        // Return client
        return mongoClient;
    });
}
exports.connectDb = connectDb;
