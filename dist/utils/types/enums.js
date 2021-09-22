"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupSize = exports.HttpMethods = exports.GroupType = exports.SpecialUsers = exports.UserRole = exports.MongoCollection = void 0;
var MongoCollection;
(function (MongoCollection) {
    MongoCollection["users"] = "users";
    MongoCollection["groups"] = "groups";
    MongoCollection["subscriptions"] = "subscriptions";
})(MongoCollection = exports.MongoCollection || (exports.MongoCollection = {}));
var UserRole;
(function (UserRole) {
    UserRole["bro"] = "bro";
    UserRole["corporate"] = "corporate";
    UserRole["admin"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var SpecialUsers;
(function (SpecialUsers) {
    SpecialUsers["dev-admin"] = "dev-admin";
})(SpecialUsers = exports.SpecialUsers || (exports.SpecialUsers = {}));
var GroupType;
(function (GroupType) {
    GroupType["beer"] = "beer";
    GroupType["coffee"] = "coffee";
})(GroupType = exports.GroupType || (exports.GroupType = {}));
var HttpMethods;
(function (HttpMethods) {
    HttpMethods["POST"] = "POST";
    HttpMethods["PATCH"] = "PATCH";
})(HttpMethods = exports.HttpMethods || (exports.HttpMethods = {}));
exports.GroupSize = {
    [GroupType.beer]: 5,
    [GroupType.coffee]: 6,
};
