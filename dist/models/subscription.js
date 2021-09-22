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
exports.Subscription = void 0;
const enums_1 = require("../utils/types/enums");
const uuid_1 = require("uuid");
const db_connection_1 = require("../utils/database/db-connection");
class Subscription {
    constructor(subscriptionObject) {
        var _a, _b;
        this.endpoint = subscriptionObject.endpoint;
        this.keys = subscriptionObject.keys;
        //
        this._id = (_a = subscriptionObject._id) !== null && _a !== void 0 ? _a : uuid_1.v4();
        this.createdAt = (_b = subscriptionObject.createdAt) !== null && _b !== void 0 ? _b : new Date();
    }
    /**
     * Create subscription in DB
     */
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_connection_1.db.collection(enums_1.MongoCollection.subscriptions).insertOne(this);
        });
    }
    /**
     * Returns a copy of object data (without method or sensitive information - aka password)
     */
    getPlainObject() {
        // Deep copy of object and removes methods
        const thisCopy = JSON.parse(JSON.stringify(this));
        // Return copy of object
        return thisCopy;
    }
}
exports.Subscription = Subscription;
