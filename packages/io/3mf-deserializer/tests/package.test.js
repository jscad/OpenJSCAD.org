import fs from 'fs'
import path from 'path'

import test from 'ava'
import { countOf } from '../../test/helpers/countOf.js'

import { deserialize } from '../src/index.js'

const samplesPath = './tests/'

test('package decompression/contents works as expected, geometry', (t) => {
  // single mesh, no materials, no colorgroups
  const inputPath = path.resolve(samplesPath, '3mf/P_XXX_0101_01.3mf')
  const inputFile = fs.readFileSync(inputPath) // read RAW binary stream

  const objects = deserialize({ output: 'geometry' }, inputFile)
  t.is(objects.length, 1)

  const object = objects[0]
  t.is(object.polygons.length, 12)
  t.is(object.transforms.length, 16)
})

test('package decompression/contents works as expected, script', (t) => {
  // single mesh, no materials, no colorgroups
  const inputPath = path.resolve(samplesPath, '3mf/P_XXX_0101_01.3mf')
  const inputFile = fs.readFileSync(inputPath) // read RAW binary stream

  const script = deserialize({ output: 'script' }, inputFile)

  t.is(countOf('createObject', script), 2)
  t.is(countOf('createBuildItem', script), 2)
  t.is(countOf('const main', script), 1)
})
