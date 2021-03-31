export interface IUser {
    id: string
    name: string
    accessRights: IUserAccessRights[]
}

export interface IUserAccessRights {
    webpageId: string
    path?: string
    label?: string
}
