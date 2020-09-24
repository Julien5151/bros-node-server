import { UserRole } from "../utils/types/enums";

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
