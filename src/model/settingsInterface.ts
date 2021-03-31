export interface IWebPage {
    id: string
    label: string
    description: string
    hostname: string
}
export interface ISettings {
    webpages: IWebPage[]
}
