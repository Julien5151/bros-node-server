export interface CustomError {
    statusCode: number;
    message: string;
}

export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    zipcode?: number;
    password?: string;
    role?: UserRole;
    createdAt?: Date;
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
