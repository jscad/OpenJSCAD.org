import fs from 'fs'
import path from 'path'

import test from 'ava'

import { reader } from '../src/DxfReader.js'

const samplesPath = '../../../node_modules/@jscad/sample-files'

//
// Test suite for DXF reader
//
test('DXF Reader', (t) => {
  const dxfPath = path.resolve(samplesPath, 'dxf/jscad/circle10.dxf')
  t.deepEqual(true, fs.existsSync(dxfPath))

  const src = fs.readFileSync(dxfPath, 'UTF8')
  const dxfreader = reader(src)

  t.is(typeof dxfreader, 'object')
})
