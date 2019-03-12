const fs = require('fs')
const path = require('path')
const test = require('ava')
const { CSG, CAG } = require('@jscad/csg')

const dxf = require('../DxfReader')

const samples = path.resolve('../../node_modules/@jscad/sample-files')

//
// Test suite for DXF reader
//
test('DXF Reader', t => {
  const dxfPath = path.resolve(samples, 'dxf/jscad/circle10.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  let src = fs.readFileSync(dxfPath, 'UTF8')
  let reader = dxf.reader(src)

  t.is(typeof reader, 'object')
})
