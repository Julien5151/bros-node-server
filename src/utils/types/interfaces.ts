import { UserRole } from "./enums";
import { Request } from "express";

export interface CustomError {
    statusCode: number;
    message: string;
    invalidFields?: Array<string>;
    missingFields?: Array<string>;
}

export interface CustomRequest extends Request {
    userId: string;
    userRole: UserRole;
}
