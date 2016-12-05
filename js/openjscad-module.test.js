import test from 'ava'
import path from 'path'
import fs from 'fs'

const openjscad = require('./openjscad-module')

// FIXME: this goes perhaps into too much implementation detail ?
test('compile', t => {
  const {compile} = openjscad
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')

  const ir = compile({}, script)
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


test('generateOutput', t => {
  const {generateOutput} = openjscad
  const input = {}

  const output = generateOutput(input)
  const expOutput = ''
  t.deepEqual(output, expOutput)
})

test('convert', t => {
  const {convert} = openjscad
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const inputData = fs.readFileSync(inputPath)
  const expOutputData = ''
  const inputFormat = 'stl'
  const outputFormat = 'jscad'

  const outputData = convert(inputData, inputFormat, outputFormat)
  t.deepEqual(outputData, expOutputData)
})
