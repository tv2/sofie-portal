export interface IMachine {
  id: string
  label: string
  description: string
  hostname: string
  pathArgs?: string
}
export interface ISettings {
  machines: IMachine[]
}
