const fs = require('fs')
const path = require('path')
const test = require('ava')
const deserializer = require('./index.js')

const filesPath = path.resolve('../../node_modules/@jscad/sample-files') // require.resolve('@jscad/sample-files')
const polygonsFromCsg = csg => csg.polygons.map(x => x.vertices.map(vert => ([vert.pos.x, vert.pos.y, vert.pos.z])))

test('translate simple obj file to jscad code', function (t) {
  const inputPath = path.resolve(filesPath, 'obj/cube.obj')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const expected = `// objects: 1
// object #1: polygons: 6
function main() { return
polyhedron({ points: [
  [-0.5,-0.5,0.5],
  [-0.5,-0.5,-0.5],
  [-0.5,0.5,-0.5],
  [-0.5,0.5,0.5],
  [0.5,-0.5,0.5],
  [0.5,-0.5,-0.5],
  [0.5,0.5,-0.5],
  [0.5,0.5,0.5]],
  polygons: [
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
  const inputPath = path.resolve(filesPath, 'obj/cube.obj')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserializer.deserialize(inputFile, undefined, {output: 'csg', addMetaData: false})
  t.deepEqual(observed.polygons.length, 6)

  const observedVertices = polygonsFromCsg(observed)
  const expectedVertices = [ [ [ -0.5, -0.5, 0.5 ],
    [ -0.5, -0.5, -0.5 ],
    [ -0.5, 0.5, -0.5 ],
    [ -0.5, 0.5, 0.5 ] ],
  [ [ -0.5, -0.5, 0.5 ],
    [ 0.5, -0.5, 0.5 ],
    [ 0.5, -0.5, -0.5 ],
    [ -0.5, -0.5, -0.5 ] ],
  [ [ -0.5, -0.5, -0.5 ],
    [ 0.5, -0.5, -0.5 ],
    [ 0.5, 0.5, -0.5 ],
    [ -0.5, 0.5, -0.5 ] ],
  [ [ -0.5, 0.5, 0.5 ],
    [ -0.5, 0.5, -0.5 ],
    [ 0.5, 0.5, -0.5 ],
    [ 0.5, 0.5, 0.5 ] ],
  [ [ -0.5, -0.5, 0.5 ],
    [ -0.5, 0.5, 0.5 ],
    [ 0.5, 0.5, 0.5 ],
    [ 0.5, -0.5, 0.5 ] ],
  [ [ 0.5, -0.5, 0.5 ],
    [ 0.5, 0.5, 0.5 ],
    [ 0.5, 0.5, -0.5 ],
    [ 0.5, -0.5, -0.5 ] ] ]
  t.deepEqual(observedVertices, expectedVertices)
})
