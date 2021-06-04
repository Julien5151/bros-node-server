export enum MongoCollection {
    "users" = "users",
    "groups" = "groups",
}

export enum UserRole {
    bro = "bro",
    corporate = "corporate",
    admin = "admin",
}

export enum GroupType {
    beer = "beer",
    coffee = "coffee",
}

export const GroupSize = {
    [GroupType.beer]: 5,
    [GroupType.coffee]: 6,
};
