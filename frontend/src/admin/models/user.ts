import {AccessRightGroup} from "./access-right-group";

export interface User {
    id: string,
    name: string,
    emberTarget: string
    accessRightGroups: AccessRightGroup[]
}
