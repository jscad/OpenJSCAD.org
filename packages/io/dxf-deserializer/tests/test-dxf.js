const fs = require('fs')
const path = require('path')
const test = require('ava')

const { deserialize } = require('../index')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

//
// Test suite for DXF deserialization (import)
//
test('ASCII DXF from Bourke 3D Entities to Object Conversion', t => {
  // const dxfPath = path.resolve(__dirname, '../../../../sample-files/dxf/bourke/3d-entities.dxf')
  const dxfPath = path.resolve(samplesPath, 'dxf/bourke/3d-entities.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let dxf = fs.readFileSync(dxfPath, 'UTF8')
  let objs = deserialize(dxf, 'aaa', { output: 'objects' })

  // expect one layer, containing 2 objects (CSG, and Line3D)
  t.true(Array.isArray(objs))
  t.is(objs.length, 2)
})
