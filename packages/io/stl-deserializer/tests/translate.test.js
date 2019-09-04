const fs = require('fs')
const path = require('path')
const test = require('ava')

const { geometry } = require('@jscad/csg')

const deserializer = require('../index.js')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

const toArray = (polygons) => polygons.map((p) => p.vertices.map((v) => ([v[0], v[1], v[2]])))

test('translate simple ascii stl to jscad code', function (t) {
  const inputPath = path.resolve(samplesPath, 'stl/testcube_ascii.stl')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const expected = `function main() { return [
// object #1: triangles: 12
primitives.polyhedron({orientation: 'inward', points: [
  [1,0,0],
  [1,1,0],
  [0,0,0],
  [1,1,0],
  [0,1,0],
  [0,0,0],
  [0,1,0],
  [0,1,1],
  [0,0,0],
  [0,1,1],
  [0,0,1],
  [0,0,0],
  [1,1,0],
  [1,1,1],
  [0,1,0],
  [1,1,1],
  [0,1,1],
  [0,1,0],
  [1,1,1],
  [1,1,0],
  [1,0,0],
  [1,0,1],
  [1,1,1],
  [1,0,0],
  [1,0,1],
  [1,0,0],
  [0,0,0],
  [0,0,1],
  [1,0,1],
  [0,0,0],
  [1,1,1],
  [1,0,1],
  [0,0,1],
  [0,1,1],
  [1,1,1],
  [0,0,1]],
  faces: [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [9,10,11],
  [12,13,14],
  [15,16,17],
  [18,19,20],
  [21,22,23],
  [24,25,26],
  [27,28,29],
  [30,31,32],
  [33,34,35]] })

  ];
}
`

  const observed = deserializer.deserialize(inputFile, undefined, { output: 'jscad', addMetaData: false })
  t.deepEqual(observed, expected)
})

test('translate simple binary stl to jscad code', function (t) {
  const inputPath = path.resolve(samplesPath, 'stl/testcube_10mm.stl')
  const inputFile = fs.readFileSync(inputPath)

  const expected = `function main() { return [
// object #undefined: triangles: 12
primitives.polyhedron({orientation: 'inward', points: [
  [5,-5,5],
  [5,-5,-5],
  [-5,-5,-5],
  [-5,-5,5],
  [5,-5,5],
  [-5,-5,-5],
  [5,-5,-5],
  [5,5,-5],
  [-5,5,-5],
  [-5,-5,-5],
  [5,-5,-5],
  [-5,5,-5],
  [5,-5,5],
  [5,5,5],
  [5,5,-5],
  [5,-5,-5],
  [5,-5,5],
  [5,5,-5],
  [-5,-5,5],
  [-5,5,5],
  [5,5,5],
  [5,-5,5],
  [-5,-5,5],
  [5,5,5],
  [-5,-5,-5],
  [-5,5,-5],
  [-5,5,5],
  [-5,-5,5],
  [-5,-5,-5],
  [-5,5,5],
  [5,5,5],
  [-5,5,5],
  [-5,5,-5],
  [5,5,-5],
  [5,5,5],
  [-5,5,-5]],
  faces: [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [9,10,11],
  [12,13,14],
  [15,16,17],
  [18,19,20],
  [21,22,23],
  [24,25,26],
  [27,28,29],
  [30,31,32],
  [33,34,35]] })

  ];
}
`

  const observed = deserializer.deserialize(inputFile, undefined, { output: 'jscad', addMetaData: false })
  t.deepEqual(observed, expected)
})
