const fs = require('fs')
const path = require('path')
const test = require('ava')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

const { geometry } = require('@jscad/csg')

const deserializer = require('./index.js')

const toArray = (polygons) => polygons.map((p) => p.vertices.map((v) => ([v[0], v[1], v[2]])))

test('translate simple obj file to jscad code', function (t) {
  const inputPath = path.resolve(samplesPath, 'obj/cube.obj')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const expected = `// objects: 1
// object #1: polygons: 6
function main() { return
primitives.polyhedron({orientation: 'inward', points: [
  [-0.5,-0.5,0.5],
  [-0.5,-0.5,-0.5],
  [-0.5,0.5,-0.5],
  [-0.5,0.5,0.5],
  [0.5,-0.5,0.5],
  [0.5,-0.5,-0.5],
  [0.5,0.5,-0.5],
  [0.5,0.5,0.5]],
  faces: [
  [3,2,1,0],
  [1,5,4,0],
  [2,6,5,1],
  [7,6,2,3],
  [4,7,3,0],
  [5,6,7,4]] })

}
  `

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('deserialize simple obj to cag/csg objects', function (t) {
  const inputPath = path.resolve(samplesPath, 'obj/cube.obj')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'csg', addMetaData: false})
  t.is(observed.length, 1)
  const polygons = geometry.geom3.toPolygons(observed[0])
  t.deepEqual(polygons.length, 6)

  const observedVertices = toArray(polygons)
  const expectedVertices = [
    [ [ -0.5, -0.5, 0.5 ], [ -0.5, -0.5, -0.5 ], [ -0.5, 0.5, -0.5 ], [ -0.5, 0.5, 0.5 ] ],
    [ [ -0.5, -0.5, 0.5 ], [ 0.5, -0.5, 0.5 ], [ 0.5, -0.5, -0.5 ], [ -0.5, -0.5, -0.5 ] ],
    [ [ -0.5, -0.5, -0.5 ], [ 0.5, -0.5, -0.5 ], [ 0.5, 0.5, -0.5 ], [ -0.5, 0.5, -0.5 ] ],
    [ [ -0.5, 0.5, 0.5 ], [ -0.5, 0.5, -0.5 ], [ 0.5, 0.5, -0.5 ], [ 0.5, 0.5, 0.5 ] ],
    [ [ -0.5, -0.5, 0.5 ], [ -0.5, 0.5, 0.5 ], [ 0.5, 0.5, 0.5 ], [ 0.5, -0.5, 0.5 ] ],
    [ [ 0.5, -0.5, 0.5 ], [ 0.5, 0.5, 0.5 ], [ 0.5, 0.5, -0.5 ], [ 0.5, -0.5, -0.5 ] ]
  ]
  t.deepEqual(observedVertices, expectedVertices)
})
