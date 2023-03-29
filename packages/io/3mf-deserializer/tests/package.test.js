import fs from 'fs'
import path from 'path'

import test from 'ava'

import { deserialize } from '../src/index.js'

const samplesPath = './sample-files'

test('package decompression/contents works as expected', (t) => {
  // mesh
  // const inputPath = path.resolve(samplesPath, '3mf/P_XXX_0101_01.3mf')
  // mesh and solidsupport
  // const inputPath = path.resolve(samplesPath, '3mf/P_SPX_0314_01.3mf')
  // 3 mesh, 1 component (ref to 1 mesh)
  const inputPath = path.resolve(samplesPath, '3mf/P_SPX_1518_01.3mf')
  const inputFile = fs.readFileSync(inputPath)

  let objects = deserialize({}, inputFile)
})
