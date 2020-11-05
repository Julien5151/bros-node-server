"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlChainingOperator = exports.SqlOperator = exports.groupTypeRegex = exports.GroupType = exports.UserRole = void 0;
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
exports.groupTypeRegex = new RegExp(`^(${GroupType.friends}|${GroupType.himym})$`);
var SqlOperator;
(function (SqlOperator) {
    SqlOperator["="] = "=";
    SqlOperator["<>"] = "<>";
    SqlOperator["!="] = "!=";
    SqlOperator[">"] = ">";
    SqlOperator["<"] = "<";
    SqlOperator[">="] = ">=";
    SqlOperator["<="] = "<=";
})(SqlOperator = exports.SqlOperator || (exports.SqlOperator = {}));
var SqlChainingOperator;
(function (SqlChainingOperator) {
    SqlChainingOperator["AND"] = "AND";
    SqlChainingOperator["OR"] = "OR";
})(SqlChainingOperator = exports.SqlChainingOperator || (exports.SqlChainingOperator = {}));
