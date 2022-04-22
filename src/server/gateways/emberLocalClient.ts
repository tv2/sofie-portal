import { logger } from '../utils/logger'

const { EmberClient } = require('node-emberplus')

const client = new EmberClient('127.0.0.1', 9000)

export const emberLocalClient = () => {
  client
    .connect()
    .then(() => client.getDirectory())
    .then(() => client.getElementByPath('0.1.0'))
    .then((matrix: any) => {
      logger.data(matrix).debug('Local Matrix Connected:')
    })
}

export const setMatrixConnection = (target: number, sourceIndex: number) => {
  client
    .getElementByPath('0.1.0')
    .then((matrix: any) => {
      client.matrixConnect(matrix, target, [sourceIndex])
      logger.debug('Matrix Connection changed')
    })
    .catch((error: Error) => {
      logger.error(error)
    })

  logger.info(`EmberServer Mtx (Source: ${sourceIndex}) to (Target: ${target})`)
}
