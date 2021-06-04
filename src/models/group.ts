import { GroupType } from "../utils/types/enums";
import { MongoCollection } from "../utils/types/enums";
import { v4 as uuidv4 } from "uuid";
import { db } from "../utils/database/db-connection";
import { InsertOneWriteOpResult } from "mongodb";

export class Group {
    // Mandatory properties
    type: GroupType;
    zipcode: number;
    userIds: Array<string>;
    // Optional properties
    _id: string;
    name: string;
    createdAt: Date;

    constructor(groupObject: {
        // Provided when creating a new group
        type: GroupType;
        zipcode: number;
        userIds: Array<string>;
        // Provided, when group is retrieved from DB
        _id?: string;
        name?: string;
        createdAt?: Date;
    }) {
        this.type = groupObject.type;
        this.zipcode = groupObject.zipcode;
        this.userIds = groupObject.userIds;
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

    /**
     * Returns a copy of object data (without method or sensitive information)
     */
    getPlainObject(): Group {
        // Deep copy of object and removes methods
        const thisCopy = JSON.parse(JSON.stringify(this));
        // Return copy of object
        return thisCopy;
    }
}
