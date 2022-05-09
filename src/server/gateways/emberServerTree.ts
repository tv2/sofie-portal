const EmberServer = require('node-emberplus').EmberServer

const targets = ['tgt1', 'tgt2', 'tgt3', 'tgt4', 'tgt5', 'tgt6', 'tgt7', 'tgt8', 'tgt9', 'tgt10']
const sources = [
  'src1',
  'src2',
  'src3',
  'src4',
  'src5',
  'src6',
  'src7',
  'src8',
  'src9',
  'src10',
  'src11',
  'src12',
  'src13',
  'src14',
  'src15',
  'src16',
  'src17',
  'src18',
  'src19',
  'src20',
]

const connections = Array.from(targets.keys()).map((i) => ({ target: i.toString() }))

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
            targetCount: targets.length,
            sourceCount: sources.length,
            connections,
          },
        ],
      },
    ],
  },
]
export const root = EmberServer.JSONtoTree(jsonTree)
