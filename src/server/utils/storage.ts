import { IUser } from '../../model/usersInterface'
import { logger } from './logger'

import fs from 'fs'
import path from 'path'

export const saveUsersFile = (users: IUser[]) => {
  fs.writeFile(path.resolve('dist/storage', 'users.json'), JSON.stringify({ users: users }), 'utf8', (error: any) => {
    logger.data(error).error('Error writing users.json file:')
  })
}
