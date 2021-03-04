import webpagesJson from '../../storage/webpages.json'
import {NextApiRequest, NextApiResponse} from "next";

export interface IWebAddress {
    name: string
    description: string
    hostname: string
    activeUsers: any
}

const webpages: object = webpagesJson

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(webpages)
}
