export interface IUser {
    id: string
    name: string
    emberTarget?: number
    accessRights: IUserAccessRights[]
}

export interface IUserAccessRights {
    machineId: string
    path: string
    label: string
    anonymousAccess?: boolean
}
