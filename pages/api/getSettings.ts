import settingsJson from '../../storage/settings.json'
import {NextApiRequest, NextApiResponse} from "next";

export interface IUser {
    id: string
    name: string
}
export interface IWebPage {
    id: number
    name: string
    description: string
    hostname: string
}
export interface ISettings {
    users: IUser[]
    webpages: IWebPage[]
}
const settings: ISettings =  settingsJson

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(settings)
}
