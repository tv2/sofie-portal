import { EmberServer, Model } from 'emberplus-connection'
import { NumberedTreeNodeImpl } from 'emberplus-connection/dist/model'
import {
    ConnectionDisposition,
    ConnectionOperation,
} from 'emberplus-connection/dist/model/Connection'
import { logger } from '../utils/logger'

/*
const tree = {
    // ToDo: Make tree as JSON
    0: new NumberedTreeNodeImpl(
        0,
        new Model.EmberNodeImpl('Root', undefined, undefined, true),
        {
            0: new NumberedTreeNodeImpl(
                0,
                new Model.MatrixImpl(
                    'PortalMatrix',
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                    {},
                    undefined,
                    Model.MatrixType.NToN,
                    Model.MatrixAddressingMode.NonLinear,
                    10,
                    10
                )
            ),
        }
    ),
}
*/

const tree = {
	// create a tree for the provider
	1: new NumberedTreeNodeImpl(1, new Model.EmberNodeImpl('Root', undefined, undefined, true), {
		1: new NumberedTreeNodeImpl(1, new Model.EmberNodeImpl('Node', undefined, undefined, true), {
			1: new NumberedTreeNodeImpl(
				1,
				new Model.ParameterImpl(
					Model.ParameterType.Integer,
					'Value1',
					undefined,
					2,
					undefined,
					undefined,
					Model.ParameterAccess.ReadWrite
				)
			),
			2: new NumberedTreeNodeImpl(
				2,
				new Model.ParameterImpl(
					Model.ParameterType.Integer,
					'Value2',
					undefined,
					2,
					undefined,
					undefined,
					Model.ParameterAccess.ReadWrite
				)
			),
			3: new NumberedTreeNodeImpl(
				3,
				new Model.ParameterImpl(
					Model.ParameterType.Integer,
					'Value3',
					undefined,
					2,
					undefined,
					undefined,
					Model.ParameterAccess.ReadWrite
				)
			)
		}),

		2: new NumberedTreeNodeImpl(2, new Model.EmberNodeImpl('Functions', undefined, undefined, true), {
			1: new NumberedTreeNodeImpl(
				1,
				new Model.EmberFunctionImpl(undefined, undefined) //, [{ type: ParameterType.Boolean, name: 'Test' }])
			)
		}),

		3: new NumberedTreeNodeImpl(3, new Model.EmberNodeImpl('Matrices', undefined, undefined, true), {
			1: new NumberedTreeNodeImpl(
				1,
				new Model.MatrixImpl(
					'Test Matrix',
					[1, 2, 3, 4, 5],
					[1, 2, 3, 4, 5],
					{},
					undefined,
					Model.MatrixType.NToN,
					Model.MatrixAddressingMode.NonLinear,
					5,
					5
				)
			)
		})
	})
}

const emberServer = new EmberServer(9000) // start server on port 9000

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
    targetIndex: number,
    sourceIndex: number
) => {
    //tree[1].children[1].children[1].children[1].number[1]
    emberServer.updateMatrixConnection(
        emberServer.tree["1"].children["3"].children["1"],
        {
            target: targetIndex,
            sources: [sourceIndex],
            operation: ConnectionOperation.Connect,
            disposition: ConnectionDisposition.Modified,
        }
    )
}

export const emberMtx = () => {
    emberServer.init(tree) // initiate the provider with the tree
    console.log(emberServer.getElementByPath('Root'))
    setMatrixConnection(1, 1)
    emberServer.update(emberServer.getElementByPath('1.1.1'), { value: '12' })
}
