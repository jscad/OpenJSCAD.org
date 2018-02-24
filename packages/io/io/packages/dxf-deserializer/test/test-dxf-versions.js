const fs = require('fs')
const path = require('path')
const test = require('ava')
const { CSG, CAG } = require('@jscad/csg')

const { nearlyEqual } = require( '../../../test/helpers/nearlyEqual' )

const { deserialize } = require( '../index' )

const samples = path.resolve('../../node_modules/@jscad/sample-files')

//
// Test suite for DXF deserialization (import)
//
test('ASCII DXF R13 to Object Conversion', t => {
  const dxfPath = path.resolve(samples, 'dxf/ezdxf/small_r13.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'aaa',{output: 'csg'})

  t.true(Array.isArray(objs))
  t.is(objs.length, 16)

  t.true(objs[0] instanceof CSG.Path2D)
  t.true(objs[15] instanceof CSG.Path2D)
})

test('ASCII DXF R14 to Object Conversion', t => {
  const dxfPath = path.resolve(samples, 'dxf/ezdxf/small_r14.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'aaa',{output: 'csg'})

  t.true(Array.isArray(objs))
  t.is(objs.length, 0)
})

test('ASCII DXF ANSI to Object Conversion', t => {
  const dxfPath = path.resolve(samples, 'dxf/ezdxf/ansi_pattern.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'aaa',{output: 'csg'})

  t.true(Array.isArray(objs))
  t.is(objs.length, 1)

  t.true(objs[0] instanceof CAG)
})

test('ASCII DXF ISO to Object Conversion', t => {
  const dxfPath = path.resolve(samples, 'dxf/ezdxf/iso_pattern.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf,'aaa',{output: 'csg'})

  t.true(Array.isArray(objs))
  t.is(objs.length, 14)

  t.true(objs[0] instanceof CAG)
  t.true(objs[13] instanceof CAG)
})



