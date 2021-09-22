import { MongoCollection, UserRole } from "../utils/types/enums";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/database/db-connection";
import {
    DeleteWriteOpResultObject,
    InsertOneWriteOpResult,
    UpdateQuery,
    UpdateWriteOpResult,
} from "mongodb";
import { CustomError } from "../utils/types/interfaces";

export class Subscription {
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
     * Returns a copy of object data (without method or sensitive information - aka password)
     */
    getPlainObject(): Subscription {
        // Deep copy of object and removes methods
        const thisCopy = JSON.parse(JSON.stringify(this));
        // Return copy of object
        return thisCopy;
    }
}
