import {NextApiRequest, NextApiResponse} from "next";
import webpagesJson from '../../storage/users.json'
export interface IUsers {
    id: string
    name: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const users: object = webpagesJson
            res.status(200).json(users);
            break
        case 'POST':
            console.log(req.body)
            res.status(200).json("test")
            break
        default:
            res.status(405).end() //Method Not Allowed
            break
    }
}
