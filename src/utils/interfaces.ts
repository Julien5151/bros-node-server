export interface CustomError {
    statusCode: number;
    message: string;
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
