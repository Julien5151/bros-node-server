"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const enums_1 = require("../utils/types/enums");
const uuid_1 = require("uuid");
const db_connection_1 = require("../utils/database/db-connection");
class User {
    constructor(userObject) {
        this.firstName = userObject.firstName;
        this.lastName = userObject.lastName;
        this.email = userObject.email;
        this.zipcode = userObject.zipcode;
        this.password = userObject.password;
        //
        this._id = userObject._id ?? uuid_1.v4();
        this.createdAt = userObject.createdAt ?? new Date();
        this.phone = userObject.phone ?? "";
        this.address = userObject.address ?? "";
        this.role = userObject.role ?? enums_1.UserRole.bro;
        this.groupId = userObject.groupId ?? null;
        this.availableForGrouping = userObject.availableForGrouping ?? false;
    }
    /**
     * Loads user from DB using its _id or email. The same can be achieved by passing all
     * arguments to constructor
     */
    static async load(identifier) {
        let userData;
        // Check whether an email or id was used as an identifier
        if (identifier.includes("@")) {
            // Using and email
            userData = await db_connection_1.db
                .collection(enums_1.MongoCollection.users)
                .findOne({ email: { $eq: identifier } });
        }
        else {
            // Using an _id
            userData = await db_connection_1.db
                .collection(enums_1.MongoCollection.users)
                .findOne({ _id: { $eq: identifier } });
        }
        // If a user is found, instanciate it and return the user
        if (userData) {
            return new this(userData);
        }
        else {
            // Throw not found error
            const notFoundError = {
                statusCode: 404,
                message: "User not found",
            };
            throw notFoundError;
        }
    }
    /**
     * Loads multiple users from DB using their _id or email
     */
    static async loadMany(identifiers) {
        // Using and email
        const usersData = await db_connection_1.db
            .collection(enums_1.MongoCollection.users)
            .find({
            $or: [
                { email: { $in: identifiers } },
                { _id: { $in: identifiers } },
            ],
        })
            .toArray();
        // If users are found, instanciate them and return the array
        if (usersData.length > 0) {
            const users = usersData.map((userData) => new this(userData));
            return users;
        }
        else {
            // Throw not found error
            const notFoundError = {
                statusCode: 404,
                message: "No user found",
            };
            throw notFoundError;
        }
    }
    /**
     * Delete user from DB using its _id.
     */
    static async delete(userId) {
        // Delete user from DB
        return db_connection_1.db
            .collection(enums_1.MongoCollection.users)
            .deleteOne({ _id: { $eq: userId } });
    }
    /**
     * Update multiple user at once based on provided update query
     */
    static async updateMany(userIds, updateQuery) {
        // Delete user from DB
        return db_connection_1.db
            .collection(enums_1.MongoCollection.users)
            .updateMany({ _id: { $in: userIds } }, updateQuery);
    }
    /**
     * WARNING : Delete ALL user documents
     */
    static async deleteAll() {
        // Delete all user documents from DB
        return db_connection_1.db.collection(enums_1.MongoCollection.users).deleteMany({});
    }
    /**
     * Randomly fetch a sample of users based on a sample size and a zipcode, only select
     * users that are availableForGrouping
     */
    static async findRandomSample(sampleSize, zipcode, excludeId) {
        // Base aggregation pipeline
        const aggregationPipeline = [
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
        const userListData = await db_connection_1.db
            .collection(enums_1.MongoCollection.users)
            .aggregate(aggregationPipeline)
            .toArray();
        // If there are not enough people in region, send 404
        // with relevant error message
        if (userListData.length < sampleSize) {
            // Throw not enough people found error
            const notFoundError = {
                statusCode: 404,
                message: "Not enough people found in this region",
            };
            throw notFoundError;
        }
        else {
            // Instanciate all users in the array
            const userList = userListData.map((userData) => new this(userData));
            return userList;
        }
    }
    /**
     * Create user in DB
     */
    async create() {
        return db_connection_1.db.collection(enums_1.MongoCollection.users).insertOne(this);
    }
    /**
     * Delete user from DB
     */
    async delete() {
        // Delete user from DB
        return db_connection_1.db
            .collection(enums_1.MongoCollection.users)
            .deleteOne({ _id: { $eq: this._id } });
    }
    /**
     * Update user in DB, replaces all fields (except _id)
     */
    async update() {
        // Mutate object in DB
        return db_connection_1.db.collection(enums_1.MongoCollection.users).updateOne({ _id: { $eq: this._id } }, {
            $set: this,
        });
    }
    /**
     * Returns a copy of object data (without method or sensitive information - aka password)
     */
    getPlainObject() {
        // Deep copy of object and removes methods
        const thisCopy = JSON.parse(JSON.stringify(this));
        // Remove sensitive information
        delete thisCopy.password;
        // Return copy of object
        return thisCopy;
    }
}
exports.User = User;
