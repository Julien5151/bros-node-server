import { GroupType } from "../utils/types/enums";

export interface Group {
    id?: number;
    name?: string;
    type?: GroupType;
    createdAt?: Date;
}
