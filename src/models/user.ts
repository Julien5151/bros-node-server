import { MongoCollection, UserRole } from "../utils/types/enums";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/database/db-connection";
import { InsertOneWriteOpResult } from "mongodb";

export class User {
    // Mandatory properties
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    zipcode: number;
    password: string;
    createdAt: Date;
    // Optional properties
    phone = "";
    address = "";
    role: UserRole = UserRole.visitor;

    constructor(
        firstName: string,
        lastName: string,
        email: string,
        zipcode: number,
        password: string
    ) {
        this._id = uuidv4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.zipcode = zipcode;
        this.password = password;
        this.createdAt = new Date();
    }

    // Save user in DB
    async save(): Promise<InsertOneWriteOpResult<any>> {
        return db.collection(MongoCollection.users).insertOne(this);
    }
}
