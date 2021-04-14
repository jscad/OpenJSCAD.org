const fs = require('fs')
const path = require('path')
const test = require('ava')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

const deserializer = require('../index.js')

test('translate simple obj file to jscad script', (t) => {
  const inputPath = path.resolve(samplesPath, 'obj/cube.obj')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  const expected = `const {primitives} = require('@jscad/modeling')

// groups: 1
// points: 8
const main = () => {
  // points are common to all geometries
  let points = [
    [-0.5,-0.5,0.5],
    [-0.5,-0.5,-0.5],
    [-0.5,0.5,-0.5],
    [-0.5,0.5,0.5],
    [0.5,-0.5,0.5],
    [0.5,-0.5,-0.5],
    [0.5,0.5,-0.5],
    [0.5,0.5,0.5],
  ]

  let geometries = [
    group0(points), // default
  ]
  return geometries
}


// group : default
// faces: 6
const group0 = (points) => {
  let faces = [
    [3,2,1,0],
    [1,5,4,0],
    [2,6,5,1],
    [7,6,2,3],
    [4,7,3,0],
    [5,6,7,4],
  ]
  let colors = [
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  return primitives.polyhedron({ orientation: 'outward', points, faces, colors })
}

module.exports = {main}
`

  t.deepEqual(observed, expected)
})

test('translate absolute face references to jscad script', (t) => {
  const data = `
v 0.000000 2.000000 2.000000
v 0.000000 0.000000 2.000000
v 2.000000 0.000000 2.000000
v 2.000000 2.000000 2.000000
v 0.000000 2.000000 0.000000
v 0.000000 0.000000 0.000000
v 2.000000 0.000000 0.000000
v 2.000000 2.000000 0.000000
g cube
usemtl teal
f 1 2 3 4
f 8 7 6 5
f 4 3 7 8
f 5 1 4 8
f 5 6 2 1
f 2 6 7 3
`
  const observed = deserializer.deserialize({ filename: 'absolute', output: 'script', addMetaData: false }, data)
  const expected = `const {primitives} = require('@jscad/modeling')

// groups: 1
// points: 8
const main = () => {
  // points are common to all geometries
  let points = [
    [0,2,2],
    [0,0,2],
    [2,0,2],
    [2,2,2],
    [0,2,0],
    [0,0,0],
    [2,0,0],
    [2,2,0],
  ]

  let geometries = [
    group0(points), // cube
  ]
  return geometries
}


// group : cube
// faces: 6
const group0 = (points) => {
  let faces = [
    [0,1,2,3],
    [7,6,5,4],
    [3,2,6,7],
    [4,0,3,7],
    [4,5,1,0],
    [1,5,6,2],
  ]
  let colors = [
    [0,0.5019607843137255,0.5019607843137255,1],
    [0,0.5019607843137255,0.5019607843137255,1],
    [0,0.5019607843137255,0.5019607843137255,1],
    [0,0.5019607843137255,0.5019607843137255,1],
    [0,0.5019607843137255,0.5019607843137255,1],
    [0,0.5019607843137255,0.5019607843137255,1],
  ]
  return primitives.polyhedron({ orientation: 'outward', points, faces, colors })
}

module.exports = {main}
`

  t.deepEqual(observed, expected)
})

test('translate relative face references to jscad script', (t) => {
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
  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, data)
  const expected = `const {primitives} = require('@jscad/modeling')

// groups: 1
// points: 24
const main = () => {
  // points are common to all geometries
  let points = [
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
    [2,0,2],
  ]

  let geometries = [
    group0(points), // default
  ]
  return geometries
}


// group : default
// faces: 6
const group0 = (points) => {
  let faces = [
    [0,1,2,3],
    [4,5,6,7],
    [8,9,10,11],
    [12,13,14,15],
    [16,17,18,19],
    [20,21,22,23],
  ]
  let colors = [
    null,
    null,
    null,
    null,
    null,
    null,
  ]
  return primitives.polyhedron({ orientation: 'outward', points, faces, colors })
}

module.exports = {main}
`
  t.deepEqual(observed, expected)
})
