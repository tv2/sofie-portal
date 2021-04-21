export interface IUser {
    id: string
    name: string
    accessRights: IUserAccessRights[]
}

export interface IUserAccessRights {
    machineId: string
    path: string
    label: string
    anonymousAccess?: boolean
}
