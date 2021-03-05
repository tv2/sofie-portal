import settingsJson from '../../storage/settings.json'
import {NextApiRequest, NextApiResponse} from "next";

export interface IUsers {
    id: string
    name: string
}
export interface IWebPages {
    id: number
    name: string
    description: string
    hostname: string
}
export interface ISettings {
    users: IUsers[]
    webpages: IWebPages[]
}
const settings: ISettings =  settingsJson

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(settings)
}
