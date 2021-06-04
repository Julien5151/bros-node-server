import { MongoCollection, UserRole } from "../utils/types/enums";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/database/db-connection";
import {
    DeleteWriteOpResultObject,
    InsertOneWriteOpResult,
    UpdateWriteOpResult,
} from "mongodb";
import { CustomError } from "../utils/types/interfaces";

export class User {
    /**
     * Loads user from DB using its _id or email. The same can be achieved by passing all
     * arguments to constructor
     * @param identifier _id or email of the user
     */
    static async load(identifier: string): Promise<User> {
        let userData;
        // Check whether an email or id was used as an identifier
        if (identifier.includes("@")) {
            // Using and email
            userData = await db
                .collection(MongoCollection.users)
                .findOne({ email: { $eq: identifier } });
        } else {
            // Using an _id
            userData = await db
                .collection(MongoCollection.users)
                .findOne({ _id: { $eq: identifier } });
        }
        // If a user is found, instanciate it and return the user
        if (userData) {
            return new this(userData);
        } else {
            // Throw not found error
            const notFoundError: CustomError = {
                statusCode: 404,
                message: "User not found",
            };
            throw notFoundError;
        }
    }

    /**
     * Delete user from DB using its _id.
     */
    static async delete(userId: string): Promise<DeleteWriteOpResultObject> {
        // Delete user from DB
        return db
            .collection(MongoCollection.users)
            .deleteOne({ _id: { $eq: userId } });
    }

    /**
     * WARNING : Delete ALL user documents
     */
    static async deleteAll(): Promise<DeleteWriteOpResultObject> {
        // Delete all user documents from DB
        return db.collection(MongoCollection.users).deleteMany({});
    }

    /**
     * Randomly fetch a sample of users based on a sample size and a zipcode, only select
     * users that are both availableForGrouping
     * @param sampleSize size of the sample
     * @param zipcode zipcode for locating users
     */
    static async findRandomSample(
        sampleSize: number,
        zipcode: number,
        excludeId?: string
    ): Promise<Array<User>> {
        // Base aggregation pipeline
        const aggregationPipeline: Array<any> = [
            {
                $match: {
                    zipcode: { $eq: zipcode },
                    availableForGrouping: { $eq: true },
                },
            },
            { $sample: { size: sampleSize } },
        ];
        // Exclude id if provided as an argument
        if (excludeId) {
            aggregationPipeline[0].$match._id = { $ne: excludeId };
        }
        const userListData = await db
            .collection(MongoCollection.users)
            .aggregate(aggregationPipeline)
            .toArray();
        // If there are not enough people in region, send 404
        // with relevant error message
        if (userListData.length < sampleSize) {
            // Throw not enough people found error
            const notFoundError: CustomError = {
                statusCode: 404,
                message: "Not enough people found in this region",
            };
            throw notFoundError;
        } else {
            // Instanciate all users in the array
            const userList = userListData.map((userData) => new this(userData));
            return userList;
        }
    }

    // Mandatory properties
    firstName: string;
    lastName: string;
    email: string;
    zipcode: number;
    password: string;
    // Optional properties
    _id: string;
    createdAt: Date;
    phone: string;
    address: string;
    role: UserRole;
    grouped: boolean;
    availableForGrouping: boolean;

    constructor(userObject: {
        // Provided when creating a new user
        firstName: string;
        lastName: string;
        email: string;
        zipcode: number;
        password: string;
        // Provided, when user is retrieved from DB
        _id?: string;
        createdAt?: Date;
        phone?: string;
        address?: string;
        role?: UserRole;
        grouped?: boolean;
        availableForGrouping?: boolean;
    }) {
        this.firstName = userObject.firstName;
        this.lastName = userObject.lastName;
        this.email = userObject.email;
        this.zipcode = userObject.zipcode;
        this.password = userObject.password;
        //
        this._id = userObject._id ?? uuidv4();
        this.createdAt = userObject.createdAt ?? new Date();
        this.phone = userObject.phone ?? "";
        this.address = userObject.address ?? "";
        this.role = userObject.role ?? UserRole.visitor;
        this.grouped = userObject.grouped ?? false;
        this.availableForGrouping = userObject.availableForGrouping ?? false;
    }

    /**
     * Create user in DB
     */
    async create(): Promise<InsertOneWriteOpResult<any>> {
        return db.collection(MongoCollection.users).insertOne(this);
    }

    /**
     * Delete user from DB
     */
    async delete(): Promise<DeleteWriteOpResultObject> {
        // Delete user from DB
        return db
            .collection(MongoCollection.users)
            .deleteOne({ _id: { $eq: this._id } });
    }

    /**
     * Update user in DB, replaces all fields (except _id)
     */
    async update(): Promise<UpdateWriteOpResult> {
        // Mutate object in DB
        return db.collection(MongoCollection.users).updateOne(
            { _id: { $eq: this._id } },
            {
                $set: this,
            }
        );
    }

    /**
     * Returns a copy of object data (without method or sensitive information - aka password)
     */
    getPlainObject(): User {
        // Deep copy of object and removes methods
        const thisCopy = JSON.parse(JSON.stringify(this));
        // Remove sensitive information
        delete thisCopy.password;
        // Return copy of object (minus)
        return thisCopy;
    }
}
