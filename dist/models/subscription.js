"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Subscription = void 0;
const enums_1 = require("../utils/types/enums");
const uuid_1 = require("uuid");
class Subscription {
    constructor(userObject) {
        var _a, _b, _c, _d, _e, _f, _g;
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
        this.role = (_e = userObject.role) !== null && _e !== void 0 ? _e : enums_1.UserRole.bro;
        this.groupId = (_f = userObject.groupId) !== null && _f !== void 0 ? _f : null;
        this.availableForGrouping = (_g = userObject.availableForGrouping) !== null && _g !== void 0 ? _g : false;
    }
}
exports.Subscription = Subscription;
