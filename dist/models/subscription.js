"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const enums_1 = require("../utils/types/enums");
const uuid_1 = require("uuid");
const db_connection_1 = require("../utils/database/db-connection");
class Subscription {
    constructor(subscriptionObject) {
        this.endpoint = subscriptionObject.endpoint;
        this.keys = subscriptionObject.keys;
        //
        this._id = subscriptionObject._id ?? uuid_1.v4();
        this.createdAt = subscriptionObject.createdAt ?? new Date();
    }
    /**
     * Loads subscription from DB using its _id. The same can be achieved by passing all
     * arguments to constructor
     */
    static async load(identifier) {
        // Using an _id
        const subscriptionData = await db_connection_1.db
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
    }
    /**
     * Loads all subscriptions from DB
     */
    static async loadAll() {
        // Using and email
        const subscriptionsData = await db_connection_1.db
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
    }
    /**
     * Delete subscription from DB using its _id.
     */
    static async delete(subscriptionId) {
        // Delete user from DB
        return db_connection_1.db
            .collection(enums_1.MongoCollection.subscriptions)
            .deleteOne({ _id: { $eq: subscriptionId } });
    }
    /**
     * WARNING : Delete ALL user documents
     */
    static async deleteAll() {
        // Delete all user documents from DB
        return db_connection_1.db.collection(enums_1.MongoCollection.subscriptions).deleteMany({});
    }
    /**
     * Create subscription in DB
     */
    async create() {
        return db_connection_1.db.collection(enums_1.MongoCollection.subscriptions).insertOne(this);
    }
    /**
     * Delete subscription from DB
     */
    async delete() {
        // Delete user from DB
        return db_connection_1.db
            .collection(enums_1.MongoCollection.subscriptions)
            .deleteOne({ _id: { $eq: this._id } });
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
