const fs = require('fs')
const path = require('path')
const test = require('ava')
const { CSG, CAG } = require('@jscad/csg')

const {nearlyEqual} = require( '../../../test/helpers/nearlyEqual' )

const { deserialize } = require( '../index' )

const samples = path.resolve('../../node_modules/@jscad/sample-files')

//
// Test suite for DXF deserialization (import)
//
test('ASCII DXF 2D Entities from JSCAD to Object Conversion', t => {
  let dxfPath = path.resolve(samples, 'dxf/jscad/square10x10.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'square10x10',{output: 'csg'})

// expect one layer, containing 1 objects (CAG)
  t.true(Array.isArray(objs))
  t.is(objs.length,1)
  t.true(objs[0] instanceof CAG)

  dxfPath = path.resolve(samples, 'dxf/jscad/circle10.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  dxf = fs.readFileSync(dxfPath, 'UTF8')
  objs = deserialize(dxf,'circle10',{output: 'csg'})

// expect one layer, containing 1 objects (CAG)
  t.true(Array.isArray(objs))
  t.is(objs.length,1)
  t.true(objs[0] instanceof CAG)
})

test('ASCII DXF 2D Lines from Autocad 2017 to Object Conversion', t => {
  let dxfPath = path.resolve(samples, 'dxf/autocad2017/2Dlines.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'2Dlines',{output: 'csg'})

// expect array containing 23 objects (6 CSG.Path2D, 17 CSG.Line3D)
  t.true(Array.isArray(objs))
  t.is(objs.length,23)
  // NOTE: the extra objects are from the page layout
  t.true(objs[20] instanceof CSG.Line2D)
  t.true(objs[21] instanceof CSG.Line2D)
  t.true(objs[22] instanceof CSG.Line2D)
})

test('ASCII DXF 2D Circles from Autocad 2017 to Object Conversion', t => {
  let dxfPath = path.resolve(samples, 'dxf/autocad2017/2Dcircles.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'2Dcircles',{output: 'csg'})

// expect array containing 23 objects (3 CAG)
  t.true(Array.isArray(objs))
  t.is(objs.length,23)
  // NOTE: the extra objects are from the page layout
  t.true(objs[0] instanceof CAG) // from GROUP
  t.true(objs[21] instanceof CAG)
  t.true(objs[22] instanceof CAG)
})

test('ASCII DXF 2D Rectangles from Autocad 2017 to Object Conversion', t => {
  let dxfPath = path.resolve(samples, 'dxf/autocad2017/2Drectangles.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'2Drectangles',{output: 'csg'})

// expect array containing 23 objects (3 CAG)
  t.true(Array.isArray(objs))
  t.is(objs.length,23)
  // NOTE: the extra objects are from the page layout
  let obj = objs[20]
  t.true(obj instanceof CAG)
  t.is(obj.sides.length,4) // rectangle
  obj = objs[21]
  t.true(obj instanceof CAG)
  t.is(obj.sides.length,4) // rectangle
  obj = objs[22]
  t.true(obj instanceof CAG)
  t.is(obj.sides.length,4) // rectangle
})

test('ASCII DXF 2D Donuts from Autocad 2017 to Object Conversion', t => {
  let dxfPath = path.resolve(samples, 'dxf/autocad2017/2Ddonuts.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'2Ddonuts',{output: 'csg'})

// expect array containing 23 objects (3 CAG)
  t.true(Array.isArray(objs))
  t.is(objs.length,23)
  // NOTE: the extra ojbects are from the page layout
  t.true(objs[20] instanceof CAG)
  t.true(objs[21] instanceof CAG)
  t.true(objs[22] instanceof CAG)
})

test('ASCII DXF 2D Ellipses from Autocad 2017 to Object Conversion', t => {
  let dxfPath = path.resolve(samples, 'dxf/autocad2017/2Dellipses.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'2Dellipses',{output: 'csg'})

// expect array containing 23 objects (3 CAG)
  t.true(Array.isArray(objs))
  t.is(objs.length,23)
})

test('ASCII DXF 2D Arcs from Autocad 2017 to Object Conversion', t => {
  let dxfPath = path.resolve(samples, 'dxf/autocad2017/2Darcs.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'2Darcs',{output: 'csg'})

// expect array containing 23 objects (9 CSG.Path2D, 14 CSG.Line3D)
  t.true(Array.isArray(objs))
  t.is(objs.length,23)
  // NOTE: the extra ojbects are from the page layout
  t.true(objs[20] instanceof CSG.Path2D)
  t.true(objs[21] instanceof CSG.Path2D)
  t.true(objs[22] instanceof CSG.Path2D)
})

// HATCH as what ?
// MLINE as what ?
// SPLINE as Path2D
// TRACE ?

