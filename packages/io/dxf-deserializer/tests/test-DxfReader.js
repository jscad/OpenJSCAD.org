const fs = require('fs')
const path = require('path')
const test = require('ava')

const dxf = require('../DxfReader')

const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))

//
// Test suite for DXF reader
//
test('DXF Reader', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/jscad/circle10.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const src = fs.readFileSync(dxfPath, 'UTF8')
  const reader = dxf.reader(src)

  t.is(typeof reader, 'object')
})
