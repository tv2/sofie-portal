export interface IWebPage {
    id: string
    name: string
    description: string
    hostname: string
}
export interface ISettings {
    webpages: IWebPage[]
}
