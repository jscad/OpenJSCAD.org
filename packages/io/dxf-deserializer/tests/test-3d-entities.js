const fs = require('fs')
const path = require('path')
const test = require('ava')

const { geometries } = require('@jscad/modeling')

const { deserialize } = require('../index')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

//
// Test suite for DXF deserialization (import)
//
test('ASCII DXF from Bourke 3D Entities to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/bourke/3d-entities.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ output: 'geometry' }, dxf)

  // expect one layer, containing 2 objects (geom3 and line3)
  t.true(Array.isArray(objs))
  t.is(objs.length, 2)
  t.true(geometries.geom3.isA(objs[0]))
  // t.true(objs[1] instanceof CSG.Line3D)
})

test('ASCII DXF from JSCAD 3D Shapes to Object Conversion', (t) => {
// instantiate from a simple shape
  let dxfPath = path.resolve(samplesPath, 'dxf/jscad/pyramid.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize({ filename: 'pyramid', output: 'geometry' }, dxf)

  // expect one layer, containing one solid (geom3)
  t.true(Array.isArray(objs))
  t.is(objs.length, 1)
  let csg = objs[0]
  t.true(geometries.geom3.isA(csg))

  // instantiate from a simple shape
  dxfPath = path.resolve(samplesPath, 'dxf/jscad/cube.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  dxf = fs.readFileSync(dxfPath, 'UTF8')
  objs = deserialize({ filename: 'cube', output: 'geometry' }, dxf)

  // expect one layer, containing one solid (geom3)
  t.true(Array.isArray(objs))
  t.is(objs.length, 1)
  csg = objs[0]
  t.true(geometries.geom3.isA(csg))

  // instantiate from a simple shape
  dxfPath = path.resolve(samplesPath, 'dxf/jscad/sphere.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  dxf = fs.readFileSync(dxfPath, 'UTF8')
  objs = deserialize({ filename: 'sphere', output: 'geometry' }, dxf)

  // expect one layer, containing one solid (geom3)
  t.true(Array.isArray(objs))
  t.is(objs.length, 1)
  csg = objs[0]
  t.true(geometries.geom3.isA(csg))

  // instantiate from a simple shape
  dxfPath = path.resolve(samplesPath, 'dxf/jscad/cylinder.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  dxf = fs.readFileSync(dxfPath, 'UTF8')
  objs = deserialize({ filename: 'cylinder', output: 'geometry' }, dxf)

  // expect one layer, containing one solid (geom3)
  t.true(Array.isArray(objs))
  t.is(objs.length, 1)
  csg = objs[0]
  t.true(geometries.geom3.isA(csg))
})

test('ASCII DXF from Autocad2017 3D Lines to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/autocad2017/3Dlines.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '3Dlines', output: 'geometry' }, dxf)

  // expect one layer, containing three objects (Path2D,Path2D,Line3D)
  t.true(Array.isArray(objs))
  t.is(objs.length, 3)

  let obj = objs[0]
  t.true(geometries.path2.isA(obj))
  obj = objs[1]
  t.true(geometries.path2.isA(obj))
  obj = objs[2]
  t.true(geometries.path2.isA(obj)) // FYI the DXF is incorrect
})

test('ASCII DXF from Autocad2017 3D Boxes to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/autocad2017/3Dboxes.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '3Dboxes', output: 'geometry' }, dxf)

  // expect nothing as 3DSOLID entities cannot be converted
  t.true(Array.isArray(objs))
  t.is(objs.length, 0)
})

test('ASCII DXF from Autocad2017 3D Drawing Shapes to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/autocad2017/3Ddraw.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '3Ddraw', output: 'geometry' }, dxf)

  // expect nothing as 3DSOLID entities cannot be converted
  t.true(Array.isArray(objs))
  t.is(objs.length, 0)
})

test('ASCII DXF from exdxf 3D Mesh to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/ezdxf/AC1027_mesh.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '3Dmesh01', output: 'geometry' }, dxf)

  // expect 2D and 3D objects
  t.true(Array.isArray(objs))
  t.is(objs.length, 5)

  const obj4 = objs[4]
  t.true(geometries.geom3.isA(obj4))
  t.is(geometries.geom3.toPolygons(obj4).length, 6)
})

test('ASCII DXF from Autocad2017 3D Mesh to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/autocad2017/3Dmesh01.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: '3Dmesh01', output: 'geometry' }, dxf)

  // expect 3D objects
  t.true(Array.isArray(objs))
  t.is(objs.length, 2)

  const obj0 = objs[0]
  t.is(geometries.geom3.toPolygons(obj0).length, 54)

  const obj1 = objs[1]
  t.is(geometries.geom3.toPolygons(obj1).length, 54)
})
