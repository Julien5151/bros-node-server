import { GroupType } from "../../utils/types/enums";

export interface GroupPatchRequest {
    name?: string;
    type?: GroupType;
}
