import fs from 'fs'
import path from 'path'

import test from 'ava'

import countOf from '../../test/helpers/countOf.js'

import { deserialize } from '../src/index.js'

const samplesPath = '../../../node_modules/@jscad/sample-files'

test('deserialize simple amf file to jscad script', (t) => {
  const inputPath = path.resolve(samplesPath, 'amf/Amf_Cube.amf')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('poly3.create', observed), 12)
  t.is(countOf('polygon.color', observed), 12)
  t.is(countOf('geom3.create', observed), 1)
})

test('deserialize amf file with materials to jscad script', (t) => {
  const inputPath = path.resolve(samplesPath, 'amf/cube-with-hole.amf')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('poly3.create', observed), 144)
  t.is(countOf('polygon.color', observed), 144)
  t.is(countOf('geom3.create', observed), 1)
})
