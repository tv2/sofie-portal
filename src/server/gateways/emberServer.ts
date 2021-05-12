import { EmberServer, Model } from 'emberplus-connection'
import { NumberedTreeNodeImpl } from 'emberplus-connection/dist/model'
import {
    ConnectionDisposition,
    ConnectionOperation,
} from 'emberplus-connection/dist/model/Connection'
import { logger } from '../utils/logger'

const emberServer = new EmberServer(9000) // start server on port 9000

const tree = {
    // create a tree for the provider
    1: new NumberedTreeNodeImpl(
        1,
        new Model.EmberNodeImpl('Root', undefined, undefined, true),
        {
            1: new NumberedTreeNodeImpl(
                1,
                new Model.EmberNodeImpl('Matrices', undefined, undefined, true),
                {
                    1: new NumberedTreeNodeImpl(
                        1,
                        new Model.MatrixImpl(
                            'PortalMatrix',
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                            {},
                            undefined,
                            Model.MatrixType.OneToN,
                            Model.MatrixAddressingMode.NonLinear,
                            50,
                            50
                        )
                    ),
                }
            ),
        }
    ),
}

// Callbacks:

emberServer.onSetValue = async (node, value) => {
    // handle setting values
    emberServer.update(node, { value })

    return true
}

emberServer.onMatrixOperation = async (matrix, connections) => {
    // handle matrix operations
    for (const connection of Object.values(connections)) {
        emberServer.updateMatrixConnection(matrix, connection)
    }
}

export const setMatrixConnection = (
    target: number,
    sourceIndex: number
) => {
    emberServer.updateMatrixConnection(
        emberServer.tree['1'].children['1'].children['1'],
        {
            target: target,
            sources: [sourceIndex + 1],
            operation: ConnectionOperation.Absolute,
        }
    )
    logger.info(`EmberServer Mtx Source : ${sourceIndex} to Target : ${target}`)
    logger.info(`Target State : ${emberServer.tree[1].children[1].children[1].contents}`)
}

export const emberMtx = () => {
    emberServer.init(tree) // initiate the provider with the tree
    console.log('EmberServer Initialized on port 9000')
}
