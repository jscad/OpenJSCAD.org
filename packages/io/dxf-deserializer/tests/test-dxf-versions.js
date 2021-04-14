const fs = require('fs')
const path = require('path')
const test = require('ava')

const { geometries } = require('@jscad/modeling')

const { deserialize } = require('../index')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

//
// Test suite for DXF deserialization (import)
//
test('ASCII DXF R13 to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/ezdxf/small_r13.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: 'r13', output: 'geometry' }, dxf)

  t.true(Array.isArray(objs))
  t.is(objs.length, 16)

  t.true(geometries.path2.isA(objs[0]))
  t.true(geometries.path2.isA(objs[15]))
})

test('ASCII DXF R14 to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/ezdxf/small_r14.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: 'r14', output: 'geometry' }, dxf)

  t.true(Array.isArray(objs))
  t.is(objs.length, 0)
})

test('ASCII DXF ANSI to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/ezdxf/ansi_pattern.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: 'ansi', output: 'geometry' }, dxf)

  t.true(Array.isArray(objs))
  t.is(objs.length, 1)

  t.true(geometries.path2.isA(objs[0]))
})

test('ASCII DXF ISO to Object Conversion', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/ezdxf/iso_pattern.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const dxf = fs.readFileSync(dxfPath, 'UTF8')
  const objs = deserialize({ filename: 'iso', output: 'geometry' }, dxf)

  t.true(Array.isArray(objs))
  t.is(objs.length, 14)

  t.true(geometries.path2.isA(objs[0]))
  t.true(geometries.path2.isA(objs[13]))
})
