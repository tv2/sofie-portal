const EmberServer = require('node-emberplus').EmberServer

const sourceCount: number = 64
const targetCount: number = 64

const connections: readonly { target: string }[] = range(targetCount).map((i) => ({ target: i.toString() }))

function range(size: number): readonly number[] {
  return new Array({ length: size }).map((_,index) => index)
}

const jsonTree = [
  {
    // path "0"
    identifier: 'Sofie Portal',
    children: [
      {
        // path "0.0"
        identifier: 'identity',
        children: [
          { identifier: 'product', value: 'Sofie Portal' },
          {
            identifier: 'company',
            value: 'TV2 DK',
            access: 'readWrite',
          },
        ],
      },
      {
        // path "0.1"
        identifier: 'router',
        children: [
          {
            // path 0.1.0
            identifier: 'PortalMatrix',
            type: 'oneToN',
            mode: 'linear',
            targetCount: targetCount,
            sourceCount: sourceCount,
            connections,
          },
        ],
      },
    ],
  },
]
export const root = EmberServer.JSONtoTree(jsonTree)
