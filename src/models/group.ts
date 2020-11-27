import { GroupType } from "../utils/types/enums";
import { User } from "./user";

export interface Group {
    id?: number;
    name?: string;
    type?: GroupType;
    createdAt?: Date;
    users?: Array<User>;
}
