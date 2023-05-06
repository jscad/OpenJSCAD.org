import fs from 'fs'
import path from 'path'

import test from 'ava'
import { countOf } from '../../test/helpers/countOf.js'

import { deserialize } from '../src/index.js'

const samplesPath = './tests'

test('simple model translates as expected', (t) => {
  // single mesh, no materials, no colorgroups
  const inputPath = path.resolve(samplesPath, '3mf/P_XXX_0101_01.xml')
  const inputFile = fs.readFileSync(inputPath)

  const script = deserialize({ output: 'script' }, inputFile)

  t.is(countOf('createObject', script), 2)
  t.is(countOf('createBuildItem', script), 2)
  t.is(countOf('const main', script), 1)
})

test('model with basematerials translates as expected', (t) => {
  // single mesh, no materials, no colorgroups
  const inputPath = path.resolve(samplesPath, '3mf/P_XXX_0312_01.xml')
  const inputFile = fs.readFileSync(inputPath)

  const script = deserialize({ output: 'script' }, inputFile)

  t.is(countOf('createObject', script), 2)
  t.is(countOf('const displaycolors = [', script), 1)
  t.is(countOf('createBuildItem', script), 2)
  t.is(countOf('const main', script), 1)
})

test('model with colorgroups translates as expected', (t) => {
  // single mesh, no materials, no colorgroups
  const inputPath = path.resolve(samplesPath, '3mf/P_XXM_0101_01.xml')
  const inputFile = fs.readFileSync(inputPath)

  const script = deserialize({ output: 'script' }, inputFile)

  t.is(countOf('createObject', script), 2)
  t.is(countOf('const displaycolors = [', script), 1)
  t.is(countOf('createBuildItem', script), 2)
  t.is(countOf('const main', script), 1)
})
