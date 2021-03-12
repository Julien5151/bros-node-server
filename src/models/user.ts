import { MongoCollection, UserRole } from "../utils/types/enums";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/database/db-connection";
import { InsertOneWriteOpResult } from "mongodb";

export class User {
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
     * Save user in DB
     */
    async create(): Promise<InsertOneWriteOpResult<any>> {
        return db.collection(MongoCollection.users).insertOne(this);
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
