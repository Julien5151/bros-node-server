import { MongoCollection } from "../utils/types/enums";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/database/db-connection";
import { DeleteWriteOpResultObject, InsertOneWriteOpResult } from "mongodb";
import { CustomError } from "../utils/types/interfaces";

export class Subscription {
    /**
     * Loads subscription from DB using its _id. The same can be achieved by passing all
     * arguments to constructor
     */
    static async load(identifier: string): Promise<Subscription> {
        // Using an _id
        const subscriptionData = await db
            .collection(MongoCollection.subscriptions)
            .findOne({ _id: { $eq: identifier } });
        // If a subscription is found, instanciate it and return the subscription
        if (subscriptionData) {
            return new this(subscriptionData);
        } else {
            // Throw not found error
            const notFoundError: CustomError = {
                statusCode: 404,
                message: "Subscription not found",
            };
            throw notFoundError;
        }
    }

    /**
     * Loads all subscriptions from DB
     */
    static async loadAll(): Promise<Array<Subscription>> {
        // Using and email
        const subscriptionsData = await db
            .collection(MongoCollection.subscriptions)
            .find()
            .toArray();
        // If subscriptions are found, instanciate them and return the array
        if (subscriptionsData.length > 0) {
            const subscriptions = subscriptionsData.map(
                (subcriptionData) => new this(subcriptionData)
            );
            return subscriptions;
        } else {
            // Throw not found error
            const notFoundError: CustomError = {
                statusCode: 404,
                message: "No subscriptions found",
            };
            throw notFoundError;
        }
    }

    /**
     * Delete subscription from DB using its _id.
     */
    static async delete(
        subscriptionId: string
    ): Promise<DeleteWriteOpResultObject> {
        // Delete user from DB
        return db
            .collection(MongoCollection.subscriptions)
            .deleteOne({ _id: { $eq: subscriptionId } });
    }

    /**
     * WARNING : Delete ALL user documents
     */
    static async deleteAll(): Promise<DeleteWriteOpResultObject> {
        // Delete all user documents from DB
        return db.collection(MongoCollection.subscriptions).deleteMany({});
    }

    // Mandatory properties
    endpoint: string;
    keys: {
        auth: string;
        p256dh: string;
    };
    // Optional properties
    _id: string;
    createdAt: Date;

    constructor(subscriptionObject: {
        // Provided when creating a new subscription
        endpoint: string;
        keys: {
            auth: string;
            p256dh: string;
        };
        // Provided, when user is retrieved from DB
        _id?: string;
        createdAt?: Date;
    }) {
        this.endpoint = subscriptionObject.endpoint;
        this.keys = subscriptionObject.keys;
        //
        this._id = subscriptionObject._id ?? uuidv4();
        this.createdAt = subscriptionObject.createdAt ?? new Date();
    }

    /**
     * Create subscription in DB
     */
    async create(): Promise<InsertOneWriteOpResult<any>> {
        return db.collection(MongoCollection.subscriptions).insertOne(this);
    }

    /**
     * Delete subscription from DB
     */
    async delete(): Promise<DeleteWriteOpResultObject> {
        // Delete user from DB
        return db
            .collection(MongoCollection.subscriptions)
            .deleteOne({ _id: { $eq: this._id } });
    }

    /**
     * Returns a copy of object data (without method or sensitive information - aka password)
     */
    getPlainObject(): Subscription {
        // Deep copy of object and removes methods
        const thisCopy = JSON.parse(JSON.stringify(this));
        // Return copy of object
        return thisCopy;
    }
}
