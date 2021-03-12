"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupTypeRegex = exports.GroupSize = exports.GroupType = exports.UserRole = exports.MongoCollection = void 0;
var MongoCollection;
(function (MongoCollection) {
    MongoCollection["users"] = "users";
    MongoCollection["groups"] = "groups";
})(MongoCollection = exports.MongoCollection || (exports.MongoCollection = {}));
var UserRole;
(function (UserRole) {
    UserRole["visitor"] = "visitor";
    UserRole["bro"] = "bro";
    UserRole["corporate"] = "corporate";
    UserRole["admin"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var GroupType;
(function (GroupType) {
    GroupType["friends"] = "friends";
    GroupType["himym"] = "himym";
})(GroupType = exports.GroupType || (exports.GroupType = {}));
var GroupSize;
(function (GroupSize) {
    GroupSize[GroupSize["friends"] = 6] = "friends";
    GroupSize[GroupSize["himym"] = 5] = "himym";
})(GroupSize = exports.GroupSize || (exports.GroupSize = {}));
exports.groupTypeRegex = new RegExp(`^(${GroupType.friends}|${GroupType.himym})$`);
