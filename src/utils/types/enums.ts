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
