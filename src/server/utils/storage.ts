import { IUser } from '../../model/usersInterface'
import { logger } from './logger'

const fs = require('fs')
const path = require('path')


export const saveUsersFile = (users: IUser) => {
    fs.writeFile(
        path.resolve('build/storage', 'users.json'),
        JSON.stringify({users: users}),
        'utf8',
        (error: any) => {
            logger.error('Error writing users.json file: ', error)
        }
    )
}
