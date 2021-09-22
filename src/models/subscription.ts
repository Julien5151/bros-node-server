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
    firstName: string;
    lastName: string;
    email: string;
    zipcode: number;
    password: string;
    // Optional properties
    _id: string;
    createdAt: Date;
    phone: string | null;
    address: string | null;
    role: UserRole;
    groupId: string | null;
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
        groupId?: string;
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
        this.role = userObject.role ?? UserRole.bro;
        this.groupId = userObject.groupId ?? null;
        this.availableForGrouping = userObject.availableForGrouping ?? false;
    }
}
