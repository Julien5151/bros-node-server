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
    constructor(firstName, lastName, email, zipcode, password) {
        // Optional properties
        this.phone = "";
        this.address = "";
        this.role = enums_1.UserRole.visitor;
        this._id = uuid_1.v4();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.zipcode = zipcode;
        this.password = password;
        this.createdAt = new Date();
    }
    // Save user in DB
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_connection_1.db.collection(enums_1.MongoCollection.users).insertOne(this);
        });
    }
}
exports.User = User;
