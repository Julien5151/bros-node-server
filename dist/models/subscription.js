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
     * Loads subscription from DB using its _id. The same can be achieved by passing all
     * arguments to constructor
     */
    static load(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            // Using an _id
            const subscriptionData = yield db_connection_1.db
                .collection(enums_1.MongoCollection.subscriptions)
                .findOne({ _id: { $eq: identifier } });
            // If a subscription is found, instanciate it and return the subscription
            if (subscriptionData) {
                return new this(subscriptionData);
            }
            else {
                // Throw not found error
                const notFoundError = {
                    statusCode: 404,
                    message: "Subscription not found",
                };
                throw notFoundError;
            }
        });
    }
    /**
     * Loads all subscriptions from DB
     */
    static loadAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // Using and email
            const subscriptionsData = yield db_connection_1.db
                .collection(enums_1.MongoCollection.subscriptions)
                .find()
                .toArray();
            // If subscriptions are found, instanciate them and return the array
            if (subscriptionsData.length > 0) {
                const subscriptions = subscriptionsData.map((subcriptionData) => new this(subcriptionData));
                return subscriptions;
            }
            else {
                // Throw not found error
                const notFoundError = {
                    statusCode: 404,
                    message: "No subscriptions found",
                };
                throw notFoundError;
            }
        });
    }
    /**
     * Delete subscription from DB using its _id.
     */
    static delete(subscriptionId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete user from DB
            return db_connection_1.db
                .collection(enums_1.MongoCollection.subscriptions)
                .deleteOne({ _id: { $eq: subscriptionId } });
        });
    }
    /**
     * WARNING : Delete ALL user documents
     */
    static deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete all user documents from DB
            return db_connection_1.db.collection(enums_1.MongoCollection.subscriptions).deleteMany({});
        });
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
     * Delete subscription from DB
     */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete user from DB
            return db_connection_1.db
                .collection(enums_1.MongoCollection.subscriptions)
                .deleteOne({ _id: { $eq: this._id } });
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
