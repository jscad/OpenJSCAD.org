const fs = require('fs')
const path = require('path')
const test = require('ava')

const { geometries } = require('@jscad/modeling')

const deserializer = require('../index.js')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

const toArray = (polygons) => polygons.map((p) => p.vertices.map((v) => ([v[0], v[1], v[2]])))

test('instantiate simple ascii stl to geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'stl/testcube_ascii.stl')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.is(observed.length, 1)
  const polygons = geometries.geom3.toPolygons(observed[0])
  t.deepEqual(polygons.length, 12) // 6 faces, 12 polygons

  const observedPolygons = toArray(polygons)
  const expectedPolygons = [
    [[0, 0, 0], [1, 1, 0], [1, 0, 0]],
    [[0, 0, 0], [0, 1, 0], [1, 1, 0]],
    [[0, 0, 0], [0, 1, 1], [0, 1, 0]],
    [[0, 0, 0], [0, 0, 1], [0, 1, 1]],
    [[0, 1, 0], [1, 1, 1], [1, 1, 0]],
    [[0, 1, 0], [0, 1, 1], [1, 1, 1]],
    [[1, 0, 0], [1, 1, 0], [1, 1, 1]],
    [[1, 0, 0], [1, 1, 1], [1, 0, 1]],
    [[0, 0, 0], [1, 0, 0], [1, 0, 1]],
    [[0, 0, 0], [1, 0, 1], [0, 0, 1]],
    [[0, 0, 1], [1, 0, 1], [1, 1, 1]],
    [[0, 0, 1], [1, 1, 1], [0, 1, 1]]
  ]
  t.deepEqual(observedPolygons, expectedPolygons)
})

test('instantiate simple binary stl to geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'stl/testcube_10mm.stl')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.is(observed.length, 1)
  const polygons = geometries.geom3.toPolygons(observed[0])
  t.deepEqual(polygons.length, 12) // 6 faces, 12 polygons

  const observedPolygons = toArray(polygons)
  const expectedPolygons = [
    [[-5, -5, -5], [5, -5, -5], [5, -5, 5]],
    [[-5, -5, -5], [5, -5, 5], [-5, -5, 5]],
    [[-5, 5, -5], [5, 5, -5], [5, -5, -5]],
    [[-5, 5, -5], [5, -5, -5], [-5, -5, -5]],
    [[5, 5, -5], [5, 5, 5], [5, -5, 5]],
    [[5, 5, -5], [5, -5, 5], [5, -5, -5]],
    [[5, 5, 5], [-5, 5, 5], [-5, -5, 5]],
    [[5, 5, 5], [-5, -5, 5], [5, -5, 5]],
    [[-5, 5, 5], [-5, 5, -5], [-5, -5, -5]],
    [[-5, 5, 5], [-5, -5, -5], [-5, -5, 5]],
    [[-5, 5, -5], [-5, 5, 5], [5, 5, 5]],
    [[-5, 5, -5], [5, 5, 5], [5, 5, -5]]
  ]
  t.deepEqual(observedPolygons, expectedPolygons)
})

test('instantiate medium complexity binary stl to geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'stl/pr2_head_tilt.stl')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.is(observed.length, 1)
  const polygons = geometries.geom3.toPolygons(observed[0])
  t.deepEqual(polygons.length, 1052)
})

test('instantiate complex ascii stl to geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'stl/herringbone-gear-large.stl')
  const inputFile = fs.readFileSync(inputPath, 'utf8')

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.is(observed.length, 1)
  const polygons = geometries.geom3.toPolygons(observed[0])
  t.deepEqual(polygons.length, 17742)
})

test('instantiate complex binary stl to geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'stl/UM2CableChain_BedEnd.STL')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.is(observed.length, 1)
  const polygons = geometries.geom3.toPolygons(observed[0])
  t.deepEqual(polygons.length, 12744)
})
