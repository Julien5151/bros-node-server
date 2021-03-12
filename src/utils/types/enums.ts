export enum MongoCollection {
    "users" = "users",
    "groups" = "groups",
}

export enum UserRole {
    visitor = "visitor",
    bro = "bro",
    corporate = "corporate",
    admin = "admin",
}

export enum GroupType {
    friends = "friends",
    himym = "himym",
}

export enum GroupSize {
    friends = 6,
    himym = 5,
}

export const groupTypeRegex = new RegExp(
    `^(${GroupType.friends}|${GroupType.himym})$`
);

export enum SqlOperator {
    "=" = "=",
    "<>" = "<>",
    "!=" = "!=",
    ">" = ">",
    "<" = "<",
    ">=" = ">=",
    "<=" = "<=",
}

export enum SqlChainingOperator {
    "AND" = "AND",
    "OR" = "OR",
}
