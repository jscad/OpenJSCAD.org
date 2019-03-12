const fs = require('fs')
const path = require('path')
const test = require('ava')
const deserializer = require('../index.js')

const filesPath = path.resolve('../../node_modules/@jscad/sample-files') // require.resolve('@jscad/sample-files')

const polygonsFromCsg = csg => csg.polygons.map(x => x.vertices.map(vert => ([vert.pos.x, vert.pos.y, vert.pos.z])))
// x=>console.log(
test('translate simple ascii stl to jscad code', function (t) {
  const inputPath = path.resolve(filesPath, 'stl/testcube_ascii.stl')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const expected = `function main() { return union(
// objects: 1
// object #1: triangles: 12
polyhedron({ points: [
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
  polygons: [
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
); }
`

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('translate simple binary stl to jscad code', function (t) {
  const inputPath = path.resolve(filesPath, 'stl/testcube_10mm.stl')
  const inputFile = fs.readFileSync(inputPath)

  const expected = `function main() { return union(
// objects: 1
// object #undefined: triangles: 12
polyhedron({ points: [
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
  polygons: [
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
); }
`

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'jscad', addMetaData: false})
  t.deepEqual(observed, expected)
})

test('deserialize simple ascii stl to cag/csg objects', function (t) {
  const inputPath = path.resolve(filesPath, 'stl/testcube_ascii.stl')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.polygons.length, 6)

  const observedVertices = polygonsFromCsg(observed)
  const expectedVertices = [ [ [ 1, 1, 0 ], [ 1, 0, 0 ], [ 0, 0, 0 ], [ 0, 1, 0 ] ],
  [ [ 0, 1, 1 ], [ 0, 1, 0 ], [ 0, 0, 0 ], [ 0, 0, 1 ] ],
  [ [ 1, 1, 1 ], [ 1, 1, 0 ], [ 0, 1, 0 ], [ 0, 1, 1 ] ],
  [ [ 1, 1, 0 ], [ 1, 1, 1 ], [ 1, 0, 1 ], [ 1, 0, 0 ] ],
  [ [ 1, 0, 0 ], [ 1, 0, 1 ], [ 0, 0, 1 ], [ 0, 0, 0 ] ],
  [ [ 1, 0, 1 ], [ 1, 1, 1 ], [ 0, 1, 1 ], [ 0, 0, 1 ] ] ]
  t.deepEqual(observedVertices, expectedVertices)
})

test('deserialize simple binary stl to cag/csg objects', function (t) {
  const inputPath = path.resolve(filesPath, 'stl/testcube_10mm.stl')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.polygons.length, 6)
  const observedVertices = polygonsFromCsg(observed)
  const expectedVertices = [ [ [ 5, -5, -5 ], [ 5, -5, 5 ], [ -5, -5, 5 ], [ -5, -5, -5 ] ],
  [ [ 5, 5, -5 ], [ 5, -5, -5 ], [ -5, -5, -5 ], [ -5, 5, -5 ] ],
  [ [ 5, 5, -5 ], [ 5, 5, 5 ], [ 5, -5, 5 ], [ 5, -5, -5 ] ],
  [ [ 5, -5, 5 ], [ 5, 5, 5 ], [ -5, 5, 5 ], [ -5, -5, 5 ] ],
  [ [ -5, 5, 5 ], [ -5, 5, -5 ], [ -5, -5, -5 ], [ -5, -5, 5 ] ],
  [ [ 5, 5, 5 ], [ 5, 5, -5 ], [ -5, 5, -5 ], [ -5, 5, 5 ] ] ]
  t.deepEqual(observedVertices, expectedVertices)
})

test('deserialize medium complexity binary stl to cag/csg objects', function (t) {
  const inputPath = path.resolve(filesPath, 'stl/pr2_head_tilt.stl')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.polygons.length, 849)
  const observedVertices = polygonsFromCsg(observed)
  const expectedVertices = JSON.parse(fs.readFileSync(path.join(__dirname, 'pr2_head_tilt_vertices.json'), 'utf8'))
  t.deepEqual(observedVertices, expectedVertices)
})

test('deserialize complex ascii stl to cag/csg objects', function (t) {
  const inputPath = path.resolve(filesPath, 'stl/herringbone-gear-large.stl')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.polygons.length, 14611)
  // too many vertices for a reasonable in detail test : even a generated JSON from just the CSG vertices is almost 2 MB !

  // const observedVertices = polygonsFromCsg(observed)
  // const expectedVertices = JSON.parse(fs.readFileSync('./testExpecteds/herringbone-gear-large.json', 'utf8'))
  // t.deepEqual(observedVertices, expectedVertices)
  // fs.writeFileSync('herringbone-gear-large.json', JSON.stringify(observedVertices))
})

test('deserialize complex binary stl to cag/csg objects (2)', function (t) {
  const inputPath = path.resolve(filesPath, 'stl/UM2CableChain_BedEnd.STL')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.polygons.length, 10241)
  // too many vertices for a reasonable in detail test : even a generated JSON from just the CSG vertices is almost 2 MB !

  // const observedVertices = polygonsFromCsg(observed)
  // const expectedVertices = JSON.parse(fs.readFileSync('./testExpecteds/herringbone-gear-large.json', 'utf8'))
})
