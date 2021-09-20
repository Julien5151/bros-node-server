export enum MongoCollection {
    "users" = "users",
    "groups" = "groups",
}

export enum UserRole {
    bro = "bro",
    corporate = "corporate",
    admin = "admin",
}

export enum SpecialUsers {
    "dev-admin" = "dev-admin",
}

export enum GroupType {
    beer = "beer",
    coffee = "coffee",
}

export enum HttpMethods {
    POST = "POST",
    PATCH = "PATCH",
}

export const GroupSize = {
    [GroupType.beer]: 5,
    [GroupType.coffee]: 6,
};
