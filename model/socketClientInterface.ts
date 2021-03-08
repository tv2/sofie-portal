export interface ISocketClient {
    id: string
    userUrlName: string
    roomName: string
    connectionTime: Date
}

export interface IRoomPayload {
    roomName: string
    userUrlName: string
}
