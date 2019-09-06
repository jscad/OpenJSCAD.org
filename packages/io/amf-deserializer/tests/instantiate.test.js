const fs = require('fs')
const path = require('path')
const test = require('ava')

const { geometry } = require('@jscad/csg')

const deserializer = require('../index.js')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

const toArray = (polygons) => polygons.map((p) => p.vertices.map((v) => ([v[0], v[1], v[2]])))

test('deserialize simple amf to geometry', function (t) {
  const inputPath = path.resolve(samplesPath, 'amf/Amf_Cube.amf')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserializer.deserialize(inputFile, undefined, { output: 'csg', addMetaData: false })
  t.is(observed.length, 1)
  const polygons = geometry.geom3.toPolygons(observed[0])
  t.deepEqual(polygons.length, 12)

  const observedVertices = toArray(polygons)
  // NOTE: 0.99999 instead of 1 ... hurray for sax / js precision
  const expectedVertices = [
    [ [ 1, 1, -1 ], [ 1, -1, -1 ], [ -1, -1, -1 ] ],
    [ [ 1, 1, -1 ], [ -1, -1, -1 ], [ -1, 1, -1 ] ],
    [ [ 1, 0.999999, 1 ], [ -1, 1, 1 ], [ -1, -1, 1 ] ],
    [ [ 1, 0.999999, 1 ], [ -1, -1, 1 ], [ 0.999999, -1, 1 ] ],
    [ [ 1, 1, -1 ], [ 1, 0.999999, 1 ], [ 0.999999, -1, 1 ] ],
    [ [ 1, 1, -1 ], [ 0.999999, -1, 1 ], [ 1, -1, -1 ] ],
    [ [ 1, -1, -1 ], [ 0.999999, -1, 1 ], [ -1, -1, 1 ] ],
    [ [ 1, -1, -1 ], [ -1, -1, 1 ], [ -1, -1, -1 ] ],
    [ [ -1, -1, -1 ], [ -1, -1, 1 ], [ -1, 1, 1 ] ],
    [ [ -1, -1, -1 ], [ -1, 1, 1 ], [ -1, 1, -1 ] ],
    [ [ 1, 0.999999, 1 ], [ 1, 1, -1 ], [ -1, 1, -1 ] ],
    [ [ 1, 0.999999, 1 ], [ -1, 1, -1 ], [ -1, 1, 1 ] ]
  ]

  t.deepEqual(observedVertices, expectedVertices)
})
