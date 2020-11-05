import { GroupType } from "../../utils/types/enums";

export interface GroupPostRequest {
    name: string;
    type: GroupType;
}
