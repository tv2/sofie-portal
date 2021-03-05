import settingsJson from '../../storage/settings.json'
import {NextApiRequest, NextApiResponse} from "next";

const settings: object = settingsJson

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(settings)
}
