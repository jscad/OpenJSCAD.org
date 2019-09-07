const fs = require('fs')
const path = require('path')
const test = require('ava')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

const deserializer = require('../index.js')

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

  const observed = deserializer.deserialize(inputFile, undefined, { output: 'jscad', addMetaData: false })
  t.deepEqual(observed, expected)
})

test('translate absolute face references to jscad code', function (t) {
  const data = `
v 0.000000 2.000000 2.000000
v 0.000000 0.000000 2.000000
v 2.000000 0.000000 2.000000
v 2.000000 2.000000 2.000000
v 0.000000 2.000000 0.000000
v 0.000000 0.000000 0.000000
v 2.000000 0.000000 0.000000
v 2.000000 2.000000 0.000000
f 1 2 3 4
f 8 7 6 5
f 4 3 7 8
f 5 1 4 8
f 5 6 2 1
f 2 6 7 3
`
  const observed = deserializer.deserialize(data, undefined, { output: 'jscad', addMetaData: false })
  const expected = `// objects: 1
// object #1: polygons: 6
function main() { return
primitives.polyhedron({orientation: 'inward', points: [
  [0,2,2],
  [0,0,2],
  [2,0,2],
  [2,2,2],
  [0,2,0],
  [0,0,0],
  [2,0,0],
  [2,2,0]],
  faces: [
  [0,1,2,3],
  [7,6,5,4],
  [3,2,6,7],
  [4,0,3,7],
  [4,5,1,0],
  [1,5,6,2]] })

}
  `
  t.deepEqual(observed, expected)
})

test('translate relative face references to jscad code', function (t) {
  const data = `
v 0.000000 2.000000 2.000000
v 0.000000 0.000000 2.000000
v 2.000000 0.000000 2.000000
v 2.000000 2.000000 2.000000
f -4 -3 -2 -1
v 2.000000 2.000000 0.000000
v 2.000000 0.000000 0.000000
v 0.000000 0.000000 0.000000
v 0.000000 2.000000 0.000000
f -4 -3 -2 -1
v 2.000000 2.000000 2.000000
v 2.000000 0.000000 2.000000
v 2.000000 0.000000 0.000000
v 2.000000 2.000000 0.000000
f -4 -3 -2 -1
v 0.000000 2.000000 0.000000
v 0.000000 2.000000 2.000000
v 2.000000 2.000000 2.000000
v 2.000000 2.000000 0.000000
f -4 -3 -2 -1
v 0.000000 2.000000 0.000000
v 0.000000 0.000000 0.000000
v 0.000000 0.000000 2.000000
v 0.000000 2.000000 2.000000
f -4 -3 -2 -1
v 0.000000 0.000000 2.000000
v 0.000000 0.000000 0.000000
v 2.000000 0.000000 0.000000
v 2.000000 0.000000 2.000000
f -4 -3 -2 -1
`
  const observed = deserializer.deserialize(data, undefined, { output: 'jscad', addMetaData: false })
  const expected = `// objects: 1
// object #1: polygons: 6
function main() { return
primitives.polyhedron({orientation: 'inward', points: [
  [0,2,2],
  [0,0,2],
  [2,0,2],
  [2,2,2],
  [2,2,0],
  [2,0,0],
  [0,0,0],
  [0,2,0],
  [2,2,2],
  [2,0,2],
  [2,0,0],
  [2,2,0],
  [0,2,0],
  [0,2,2],
  [2,2,2],
  [2,2,0],
  [0,2,0],
  [0,0,0],
  [0,0,2],
  [0,2,2],
  [0,0,2],
  [0,0,0],
  [2,0,0],
  [2,0,2]],
  faces: [
  [0,1,2,3],
  [4,5,6,7],
  [8,9,10,11],
  [12,13,14,15],
  [16,17,18,19],
  [20,21,22,23]] })

}
  `
  t.deepEqual(observed, expected)
})
