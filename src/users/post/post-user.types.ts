import { UserRole } from "../../utils/types/enums";

export interface UserPostRequest {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    address?: string;
    zipcode: number;
    password: string;
    confirmedPassword: string;
    role?: UserRole;
}
