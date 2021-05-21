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
exports.Group = void 0;
const enums_1 = require("../utils/types/enums");
const uuid_1 = require("uuid");
const db_connection_1 = require("../utils/database/db-connection");
class Group {
    constructor(groupObject) {
        var _a, _b, _c;
        this.type = groupObject.type;
        this.zipcode = groupObject.zipcode;
        this.users = groupObject.users;
        //
        this._id = (_a = groupObject._id) !== null && _a !== void 0 ? _a : uuid_1.v4();
        this.name = (_b = groupObject.name) !== null && _b !== void 0 ? _b : `New ${groupObject.type} group`;
        this.createdAt = (_c = groupObject.createdAt) !== null && _c !== void 0 ? _c : new Date();
    }
    /**
     * Create group in DB
     */
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_connection_1.db.collection(enums_1.MongoCollection.groups).insertOne(this);
        });
    }
}
exports.Group = Group;
