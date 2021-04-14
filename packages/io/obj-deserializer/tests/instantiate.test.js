const fs = require('fs')
const path = require('path')
const test = require('ava')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

const { geometries } = require('@jscad/modeling')

const deserializer = require('../index.js')

const toArray = (polygons) => polygons.map((p) => p.vertices.map((v) => ([v[0], v[1], v[2]])))

test('deserialize simple obj to geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'obj/cube.obj')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.is(observed.length, 1)
  const polygons = geometries.geom3.toPolygons(observed[0])
  t.deepEqual(polygons.length, 6)

  const observedVertices = toArray(polygons)
  const expectedVertices = [
    [[-0.5, 0.5, 0.5], [-0.5, 0.5, -0.5], [-0.5, -0.5, -0.5], [-0.5, -0.5, 0.5]],
    [[-0.5, -0.5, -0.5], [0.5, -0.5, -0.5], [0.5, -0.5, 0.5], [-0.5, -0.5, 0.5]],
    [[-0.5, 0.5, -0.5], [0.5, 0.5, -0.5], [0.5, -0.5, -0.5], [-0.5, -0.5, -0.5]],
    [[0.5, 0.5, 0.5], [0.5, 0.5, -0.5], [-0.5, 0.5, -0.5], [-0.5, 0.5, 0.5]],
    [[0.5, -0.5, 0.5], [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5], [-0.5, -0.5, 0.5]],
    [[0.5, -0.5, -0.5], [0.5, 0.5, -0.5], [0.5, 0.5, 0.5], [0.5, -0.5, 0.5]]
  ]
  t.deepEqual(observedVertices, expectedVertices)
})
