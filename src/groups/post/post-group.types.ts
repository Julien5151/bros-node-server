import { GroupType } from "../../utils/types/enums";

export interface GroupPostRequest {
    type: GroupType;
    zipcode: number;
}
