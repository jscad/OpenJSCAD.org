const fs = require('fs')
const path = require('path')
const test = require('ava')

const { geometries } = require('@jscad/modeling')

const { deserialize } = require('../index')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

//
// Test suite for DXF deserialization (import)
//
test('ASCII DXF 2D Entities from JSCAD to Object Conversion', (t) => {
  let dxfPath = path.resolve(samplesPath, 'dxf/jscad/square10x10.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize({ filename: 'square10x10', output: 'geometry' }, dxf)

  // expect one layer, containing 1 objects (path2)
  t.true(Array.isArray(objs))
  t.is(objs.length, 1)
  t.true(geometries.path2.isA(objs[0]))
  t.true(objs[0].isClosed)

  dxfPath = path.resolve(samplesPath, 'dxf/jscad/circle10.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  dxf = fs.readFileSync(dxfPath, 'UTF8')
  objs = deserialize({ filename: 'circle10', output: 'geometry' }, dxf)

  // expect one layer, containing 1 objects (path2)
  t.true(Array.isArray(objs))
  t.is(objs.length, 1)
  t.true(geometries.path2.isA(objs[0]))
  t.true(objs[0].isClosed)
  t.is(geometries.path2.toPoints(objs[0]).length, 32) // path
})

test('ASCII DXF 2D Lines from Autocad 2017 to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/autocad2017/2Dlines.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '2Dlines', output: 'geometry' }, dxf)

  // expect array containing 23 objects (20 path2 from page layout, 3 path2 from entities)
  t.true(Array.isArray(objs))
  t.is(objs.length, 23)
  // NOTE: the extra objects are from the page layout
  t.true(geometries.path2.isA(objs[20]))
  t.is(geometries.path2.toPoints(objs[20]).length, 2) // line
  t.true(geometries.path2.isA(objs[21]))
  t.is(geometries.path2.toPoints(objs[21]).length, 2) // line
  t.true(geometries.path2.isA(objs[22]))
  t.is(geometries.path2.toPoints(objs[22]).length, 2) // line
})

test('ASCII DXF 2D Circles from Autocad 2017 to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/autocad2017/2Dcircles.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '2Dcircles', output: 'geometry' }, dxf)

  // expect array containing 23 objects (1 path2, 2 geom2)
  t.true(Array.isArray(objs))
  t.is(objs.length, 23)
  // NOTE: the extra objects are from the page layout
  t.true(geometries.path2.isA(objs[20]))
  t.true(geometries.geom2.isA(objs[21]))
  t.is(geometries.geom2.toSides(objs[21]).length, 16) // circle
  t.true(geometries.geom2.isA(objs[22]))
  t.is(geometries.geom2.toSides(objs[22]).length, 16) // circle
})

test('ASCII DXF 2D Rectangles from Autocad 2017 to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/autocad2017/2Drectangles.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '2Drectangles', output: 'geometry' }, dxf)

  // expect array containing 23 objects (3 path3)
  t.true(Array.isArray(objs))
  t.is(objs.length, 23)
  // NOTE: the extra objects are from the page layout
  let obj = objs[20]
  t.true(geometries.path2.isA(obj))
  t.is(geometries.path2.toPoints(obj).length, 4) // rectangle
  obj = objs[21]
  t.true(geometries.path2.isA(obj))
  t.is(geometries.path2.toPoints(obj).length, 4) // rectangle
  obj = objs[22]
  t.true(geometries.path2.isA(obj))
  t.is(geometries.path2.toPoints(obj).length, 4) // rectangle
})

test('ASCII DXF 2D Donuts from Autocad 2017 to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/autocad2017/2Ddonuts.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '2Ddonuts', output: 'geometry' }, dxf)

  // expect array containing 23 objects (3 path2)
  t.true(Array.isArray(objs))
  t.is(objs.length, 23)
  // NOTE: the extra ojbects are from the page layout
  t.true(geometries.path2.isA(objs[20]))
  t.is(geometries.path2.toPoints(objs[20]).length, 18) // line
  t.true(geometries.path2.isA(objs[21]))
  t.is(geometries.path2.toPoints(objs[21]).length, 18) // line
  t.true(geometries.path2.isA(objs[22]))
  t.is(geometries.path2.toPoints(objs[22]).length, 18) // arc
})

test('ASCII DXF 2D Ellipses from Autocad 2017 to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/autocad2017/2Dellipses.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '2Dellipses', output: 'geometry' }, dxf)

  // expect array containing 23 objects (3 CAG)
  t.true(Array.isArray(objs))
  t.is(objs.length, 23)
  // NOTE: the extra ojbects are from the page layout
  t.true(geometries.geom2.isA(objs[20]))
  t.true(geometries.geom2.isA(objs[21]))
  t.true(geometries.geom2.isA(objs[22]))
})

test('ASCII DXF 2D Arcs from Autocad 2017 to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/autocad2017/2Darcs.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '2Darcs', output: 'geometry' }, dxf)

  // expect array containing 23 objects (9 path2, 14 path2)
  t.true(Array.isArray(objs))
  t.is(objs.length, 23)
  // NOTE: the extra ojbects are from the page layout
  t.true(geometries.path2.isA(objs[20]))
  t.true(geometries.path2.isA(objs[21]))
  t.true(geometries.path2.isA(objs[22]))
})

// HATCH as what ?
// MLINE as what ?
// SPLINE as Path2D
// TRACE ?
