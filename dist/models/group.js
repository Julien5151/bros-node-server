"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const enums_1 = require("../utils/types/enums");
const uuid_1 = require("uuid");
const db_connection_1 = require("../utils/database/db-connection");
class Group {
    constructor(groupObject) {
        this.type = groupObject.type;
        this.zipcode = groupObject.zipcode;
        //
        this._id = groupObject._id ?? uuid_1.v4();
        this.name = groupObject.name ?? `New ${groupObject.type} group`;
        this.createdAt = groupObject.createdAt ?? new Date();
    }
    /**
     * Create group in DB
     */
    async create() {
        return db_connection_1.db.collection(enums_1.MongoCollection.groups).insertOne(this);
    }
    /**
     * Returns a copy of object data (without method or sensitive information)
     */
    getPlainObject() {
        // Deep copy of object and removes methods
        const thisCopy = JSON.parse(JSON.stringify(this));
        // Return copy of object
        return thisCopy;
    }
}
exports.Group = Group;
