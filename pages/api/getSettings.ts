import settingsJson from '../../storage/settings.json'
import {NextApiRequest, NextApiResponse} from "next";
import { ISettings } from '../../model/settingsInterface';

const settings: ISettings =  settingsJson

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json(settings)
}
