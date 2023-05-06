import fs from 'fs'
import path from 'path'

import test from 'ava'

import { deserialize } from '../src/index.js'

const samplesPath = './tests'

test('simple model instantiates as expected', (t) => {
  // single mesh, no materials, no colorgroups
  const inputPath = path.resolve(samplesPath, '3mf/P_XXX_0101_01.xml')
  const inputFile = fs.readFileSync(inputPath, 'UTF8') // read character stream (UTF8 string)

  const objects = deserialize({ output: 'geometry' }, inputFile)
  t.is(objects.length, 1)

  const object = objects[0]
  t.is(object.polygons.length, 12)
  t.is(object.transforms.length, 16)
  t.is(object.id, '2')
  t.is(object.type, 'model')
  t.is(object.name, 'S11_cube_NA_Sliced')
})

test('model with basematerials instantiates as expected', (t) => {
  // single mesh, no materials, no colorgroups
  const inputPath = path.resolve(samplesPath, '3mf/P_XXX_0312_01.xml')
  const inputFile = fs.readFileSync(inputPath, 'UTF8') // read character stream (UTF8 string)

  const objects = deserialize({ output: 'geometry' }, inputFile)
  t.is(objects.length, 1)

  const object = objects[0]
  t.is(object.polygons.length, 16)
  t.is(object.transforms.length, 16)
  t.is(object.id, '2')
  t.is(object.type, 'model')
  t.is(object.name, 'PC_303_01.3_colormf')
})

test('model with colorgroups instantiates as expected', (t) => {
  // single mesh, no materials, no colorgroups
  const inputPath = path.resolve(samplesPath, '3mf/P_XXM_0101_01.xml')
  const inputFile = fs.readFileSync(inputPath, 'UTF8') // read character stream (UTF8 string)

  const objects = deserialize({ output: 'geometry' }, inputFile)
  t.is(objects.length, 1)

  const object = objects[0]
  t.is(object.polygons.length, 12)
  t.is(object.transforms.length, 16)
  t.is(object.id, '2')
  t.is(object.type, 'model')
  t.is(object.name, 'S11_cube_NA_Sliced')
})
