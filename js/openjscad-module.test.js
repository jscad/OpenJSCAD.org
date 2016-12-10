import test from 'ava'
import path from 'path'
import fs from 'fs'

const openjscad = require('./openjscad-module')

test.beforeEach(t => {
})

// FIXME: this goes perhaps into too much implementation detail ?
test('compile', t => {
  const {compile} = openjscad
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')

  const ir = compile(script, {})
  const expProperties = {
    cube: { center: { _x: 0, _y: 0, _z: 15 },
      facecenters: [
        {
          point: {
            _x: 15,
            _y: 0,
            _z: 15
          },
          axisvector: {
            _x: 1,
            _y: 0,
            _z: 0
          },
          normalvector: {
            _x: 0,
            _y: 0,
            _z: 1
          }
        },
        {
          point: {
            _x: -15,
            _y: 0,
            _z: 15
          },
          axisvector: {
            _x: -1,
            _y: 0,
            _z: 0
          },
          normalvector: {
            _x: 0,
            _y: 0,
            _z: 1
          }
        },
        {
          point: {
            _x: 0,
            _y: 15,
            _z: 15
          },
          axisvector: {
            _x: 0,
            _y: 1,
            _z: 0
          },
          normalvector: {
            _x: 0,
            _y: 0,
            _z: 1
          }
        },
        {
          point: {
            _x: 0,
            _y: -15,
            _z: 15
          },
          axisvector: {
            _x: 0,
            _y: -1,
            _z: 0
          },
          normalvector: {
            _x: 0,
            _y: 0,
            _z: 1
          }
        },
        {
          point: {
            _x: 0,
            _y: 0,
            _z: 30
          },
          axisvector: {
            _x: 0,
            _y: 0,
            _z: 1
          },
          normalvector: {
            _x: 1,
            _y: 0,
            _z: 0
          }
        },
        {
          point: {
            _x: 0,
            _y: 0,
            _z: 0
          },
          axisvector: {
            _x: 0,
            _y: 0,
            _z: -1
          },
          normalvector: {
            _x: 1,
            _y: 0,
            _z: 0
          }
        }
      ]
    },
    sphere: { center: { _x: 0, _y: 0, _z: 15 },
  facepoint: { _x: 20, _y: 0, _z: 15 } } }

  t.deepEqual(Object.keys(ir).sort(), ['polygons', 'properties', 'isCanonicalized', 'isRetesselated'].sort())
  t.deepEqual(ir.polygons.length, 610)
  t.deepEqual(ir.properties, expProperties)
  t.deepEqual(ir.isCanonicalized, true)
  t.deepEqual(ir.isRetesselated, true)
})

test('generateOutput(stl)', t => {
  const {generateOutput} = openjscad
  //FIXME : create a fake csgObject rather than using output from another function
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')
  const input = openjscad.compile(script, {})

  const output = generateOutput('stl', input)
  const {type, encoding, size} = output // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)
  t.is(type, 'application/sla')
  t.is(encoding, 'utf8')
  t.is(size, 326185)
})

test('generateOutput(stla)', t => {
  const {generateOutput} = openjscad
  //FIXME : create a fake csgObject rather than using output from another function
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')
  const input = openjscad.compile(script, {})

  const output = generateOutput('stla', input)
  const {type, encoding, size} = output // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)
  t.is(type, 'application/sla')
  t.is(encoding, 'utf8')
  t.is(size, 326185)
})

test('generateOutput(stlb)', t => {
  const {generateOutput} = openjscad
  //FIXME : create a fake csgObject rather than using output from another function
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')
  const input = openjscad.compile(script, {})

  const output = generateOutput('stlb', input)
  const {type, encoding, size} = output // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)
  t.is(type, 'application/sla')
  t.is(encoding, 'utf8')
  t.is(size, 70284)
})

test('generateOutput(amf)', t => {
  const {generateOutput} = openjscad
  //FIXME : create a fake csgObject rather than using output from another function
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')
  const input = openjscad.compile(script, {})

  const output = generateOutput('amf', input)
  const {type, encoding, size} = output // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)
  t.is(type, 'application/amf+xml')
  t.is(encoding, 'utf8')
  t.is(size, 385255)
})
