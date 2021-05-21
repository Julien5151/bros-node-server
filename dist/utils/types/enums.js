"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSize = exports.GroupType = exports.UserRole = exports.MongoCollection = void 0;
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
    GroupType["beer"] = "beer";
    GroupType["coffee"] = "coffee";
})(GroupType = exports.GroupType || (exports.GroupType = {}));
exports.GroupSize = {
    [GroupType.beer]: 5,
    [GroupType.coffee]: 6,
};
