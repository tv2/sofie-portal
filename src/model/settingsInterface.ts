export interface IMachine {
    id: string
    label: string
    description: string
    hostname: string
}
export interface ISettings {
    machines: IMachine[]
}
