import { GroupType } from "../utils/types/enums";
import { User } from "./user";
import { MongoCollection } from "../utils/types/enums";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/database/db-connection";
import { InsertOneWriteOpResult } from "mongodb";

export class Group {
    // Mandatory properties
    type: GroupType;
    users: Array<User>;
    // Optional properties
    _id: string;
    name: string;
    createdAt: Date;

    constructor(groupObject: {
        // Provided when creating a new group
        type: GroupType;
        users: Array<User>;
        // Provided, when group is retrieved from DB
        _id?: string;
        name?: string;
        createdAt?: Date;
    }) {
        this.type = groupObject.type;
        this.users = groupObject.users;
        //
        this._id = groupObject._id ?? uuidv4();
        this.name = groupObject.name ?? `New ${groupObject.type} group`;
        this.createdAt = groupObject.createdAt ?? new Date();
    }

    /**
     * Create group in DB
     */
    async create(): Promise<InsertOneWriteOpResult<any>> {
        return db.collection(MongoCollection.groups).insertOne(this);
    }
}
