"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const enums_1 = require("../utils/types/enums");
const uuid_1 = require("uuid");
const db_connection_1 = require("../utils/database/db-connection");
class User {
    constructor(userObject) {
        var _a, _b, _c, _d, _e;
        this.firstName = userObject.firstName;
        this.lastName = userObject.lastName;
        this.email = userObject.email;
        this.zipcode = userObject.zipcode;
        this.password = userObject.password;
        //
        this._id = (_a = userObject._id) !== null && _a !== void 0 ? _a : uuid_1.v4();
        this.createdAt = (_b = userObject.createdAt) !== null && _b !== void 0 ? _b : new Date();
        this.phone = (_c = userObject.phone) !== null && _c !== void 0 ? _c : "";
        this.address = (_d = userObject.address) !== null && _d !== void 0 ? _d : "";
        this.role = (_e = userObject.role) !== null && _e !== void 0 ? _e : enums_1.UserRole.visitor;
    }
    /**
     * Loads user from DB using its _id or email. The same can be achieved by passing all
     * arguments to constructor
     * @param identifier _id or email of the user
     */
    static load(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData;
            // Check whether an email or id was used as an identifier
            if (identifier.includes("@")) {
                // Using and email
                userData = yield db_connection_1.db
                    .collection(enums_1.MongoCollection.users)
                    .findOne({ email: { $eq: identifier } });
            }
            else {
                // Using an _id
                userData = yield db_connection_1.db
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
        });
    }
    /**
     * Delete user from DB using its _id.
     */
    static delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete user from DB
            return db_connection_1.db.collection(enums_1.MongoCollection.users).deleteOne({ _id: userId });
        });
    }
    /**
     * WARNING : Delete ALL user documents
     */
    static deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete all user documents from DB
            return db_connection_1.db.collection(enums_1.MongoCollection.users).deleteMany({});
        });
    }
    /**
     * Create user in DB
     */
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_connection_1.db.collection(enums_1.MongoCollection.users).insertOne(this);
        });
    }
    /**
     * Delete user from DB
     */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete user from DB
            return db_connection_1.db
                .collection(enums_1.MongoCollection.users)
                .deleteOne({ _id: this._id });
        });
    }
    /**
     * Update user in DB, replaces all fields (except _id)
     */
    update() {
        return __awaiter(this, void 0, void 0, function* () {
            // Deep copy of object and removes methods
            const thisCopy = JSON.parse(JSON.stringify(this));
            // Remove _id property
            delete thisCopy._id;
            // Mutate object in DB
            return db_connection_1.db.collection(enums_1.MongoCollection.users).updateOne({ _id: this._id }, {
                $set: thisCopy,
            });
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
        // Return copy of object (minus)
        return thisCopy;
    }
}
exports.User = User;
