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
        return db.collection(MongoCollection.users).deleteOne({ _id: userId });
    }

    /**
     * WARNING : Delete ALL user documents
     */
    static async deleteAll(): Promise<DeleteWriteOpResultObject> {
        // Delete all user documents from DB
        return db.collection(MongoCollection.users).deleteMany({});
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
            .deleteOne({ _id: this._id });
    }

    /**
     * Update user in DB, replaces all fields (except _id)
     */
    async update(): Promise<UpdateWriteOpResult> {
        // Deep copy of object and removes methods
        const thisCopy = JSON.parse(JSON.stringify(this));
        // Remove _id property
        delete thisCopy._id;
        // Mutate object in DB
        return db.collection(MongoCollection.users).updateOne(
            { _id: this._id },
            {
                $set: thisCopy,
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
