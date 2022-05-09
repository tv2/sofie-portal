import { logger as baseLogger } from '../utils/logger'

//@ts-ignore
import { EmberServer } from 'node-emberplus'
import { root } from './emberServerTree'

const logger = baseLogger.tag('emberServer')
const emberServer = new EmberServer('0.0.0.0', 9000, root) // start server on port 9000

export const emberMtxServer = () => {
  logger.info('Setting up Ember Server')

  emberServer
    .on('event', (event: any) => logger.data(event).debug('Ember Server Event received:'))
    .on('error', (error: any) => {
      if ((error.message ?? '').match(/(econnrefused|disconnected)/i)) {
        logger.error('Ember connection not establised')
      } else {
        logger.data(error).error('Ember connection unknown error:')
      }
    })
    .on('matrix-change', (info: { client: any; target: any; sources: any }) => {
      logger.info(`Client ${info.client} changed ${info.target} and ${info.sources}`)
    })
  logger.info('Setting up Ember Server')

  emberServer
    .listen()
    .then(() => logger.info('Ember Server is listening'))
    .catch((error: Error) => logger.error(error))
}
