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
exports.connectDb = exports.db = void 0;
const mongodb_1 = require("mongodb");
const dbUri = `mongodb+srv://db-bros-admin:${process.env.DB_PASSWORD}@bros-mongo-development.nbukm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const mongoClient = new mongodb_1.MongoClient(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
function connectDb() {
    return __awaiter(this, void 0, void 0, function* () {
        return mongoClient.connect().then((mongoClient) => {
            // Set DB variable after successfull connection
            exports.db = mongoClient.db(process.env.DB_NAME);
            // Return client
            return mongoClient;
        });
    });
}
exports.connectDb = connectDb;
