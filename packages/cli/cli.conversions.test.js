import fs from 'fs'
import path from 'path'
import { cwd } from 'process'

import test from 'ava'

import { execSync } from 'child_process'

test.afterEach.always((t) => {
  // remove files
  try {
    if (t.context.file1Path) fs.unlinkSync(t.context.file1Path)
  } catch (err) {}

  try {
    if (t.context.file2Path) fs.unlinkSync(t.context.file2Path)
  } catch (err) {}

  try {
    if (t.context.file3Path) fs.unlinkSync(t.context.file3Path)
  } catch (err) {}

  try {
    if (t.context.file4Path) fs.unlinkSync(t.context.file4Path)
  } catch (err) {}
})

test.beforeEach((t) => {
  const cliName = './cli.js'
  t.context = {
    cliPath: path.resolve(cwd(), cliName)
  }
})

// CORE FUNCTIONALITY

// These tests create input and output files.

// create a simple JSCAD script for input
// the script should produce ALL geometry types
const createJscad = (id) => {
  const jscadScript = `// test script ${id}
import { flatten } from '@jscad/array-utils'
import { primitives } from '@jscad/modeling'

export const getParameterDefinitions = () => {
  return flatten([
    { name: 'segments', caption: 'Segements:', type: 'int', initial: 10, min: 5, max: 20, step: 1 }
  ])
}

export const main = (params) => {
  // parameters
  let segments = params.segments || 16

  // shapes
  let apath2 = primitives.arc()
  let ageom2 = primitives.ellipse()
  let ageom3 = primitives.ellipsoid()

  return [apath2, ageom2, ageom3]
}
`

  const fileName = `./base${id}.js`
  const filePath = path.resolve(cwd(), fileName)
  fs.writeFileSync(filePath, jscadScript)
  return filePath
}

test('cli (conversions STL)', (t) => {
  const testID = 11

  // convert from JSCAD script to STL
  const file1Path = createJscad(testID)
  t.true(fs.existsSync(file1Path))

  t.context.file1Path = file1Path

  const file2Name = `./test${testID}.stl`
  const file2Path = path.resolve(cwd(), file2Name)
  t.false(fs.existsSync(file2Path))

  t.context.file2Path = file2Path

  const cliPath = t.context.cliPath

  let cmd = `node ${cliPath} ${file1Path} -o ${file2Path}`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file2Path))

  // convert from STL to JSCAD script
  const file3Name = `./test${testID}.js`
  const file3Path = path.resolve(cwd(), file3Name)
  t.false(fs.existsSync(file3Path))

  t.context.file3Path = file3Path

  cmd = `node ${cliPath} ${file2Path} -o ${file3Path} -v -add-metadata false`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file3Path))
})

test('cli (conversions DXF)', (t) => {
  const testID = 12

  // convert from JSCAD to DXF
  const file1Path = createJscad(testID)
  t.true(fs.existsSync(file1Path))

  t.context.file1Path = file1Path

  const file2Name = `./test${testID}.dxf`
  const file2Path = path.resolve(cwd(), file2Name)
  t.false(fs.existsSync(file2Path))

  t.context.file2Path = file2Path

  const cliPath = t.context.cliPath

  let cmd = `node ${cliPath} ${file1Path} -o ${file2Path}`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file2Path))

  // convert from DXF to JS
  const file3Name = `./test${testID}.js`
  const file3Path = path.resolve(cwd(), file3Name)
  t.false(fs.existsSync(file3Path))

  t.context.file3Path = file3Path

  cmd = `node ${cliPath} ${file2Path} -of js`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file3Path))
})

test('cli (conversions JSON)', (t) => {
  const testID = 14

  // convert from JSCAD to JSON
  const file1Path = createJscad(testID)
  t.true(fs.existsSync(file1Path))

  t.context.file1Path = file1Path

  const file2Name = `./test${testID}.json`
  const file2Path = path.resolve(cwd(), file2Name)
  t.false(fs.existsSync(file2Path))

  t.context.file2Path = file2Path

  const cliPath = t.context.cliPath

  let cmd = `node ${cliPath} ${file1Path} -o ${file2Path}`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file2Path))

  // convert from JSON to JS
  const file3Name = `./test${testID}.js`
  const file3Path = path.resolve(cwd(), file3Name)
  t.false(fs.existsSync(file3Path))

  t.context.file3Path = file3Path

  cmd = `node ${cliPath} ${file2Path} -of js`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file3Path))
})

test('cli (conversions SVG)', (t) => {
  const testID = 15

  // convert from JSCAD to SVG
  const file1Path = createJscad(testID)
  t.true(fs.existsSync(file1Path))

  t.context.file1Path = file1Path

  const file2Name = `./test${testID}.svg`
  const file2Path = path.resolve(cwd(), file2Name)
  t.false(fs.existsSync(file2Path))

  t.context.file2Path = file2Path

  const cliPath = t.context.cliPath

  let cmd = `node ${cliPath} ${file1Path} -o ${file2Path}`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file2Path))

  // convert from SVG to JS
  const file3Name = `./test${testID}.js`
  const file3Path = path.resolve(cwd(), file3Name)
  t.false(fs.existsSync(file3Path))

  t.context.file3Path = file3Path

  cmd = `node ${cliPath} ${file2Path} -of js`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file3Path))
})

test('cli (conversions X3D)', (t) => {
  const testID = 16

  // convert from JSCAD to X3D
  const file1Path = createJscad(testID)
  t.true(fs.existsSync(file1Path))

  t.context.file1Path = file1Path

  const file2Name = `./test${testID}.x3d`
  const file2Path = path.resolve(cwd(), file2Name)
  t.false(fs.existsSync(file2Path))

  t.context.file2Path = file2Path

  const cliPath = t.context.cliPath

  let cmd = `node ${cliPath} ${file1Path} -o ${file2Path}`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file2Path))

  // convert from X3D to JS
  const file3Name = `./test${testID}.js`
  const file3Path = path.resolve(cwd(), file3Name)
  t.false(fs.existsSync(file3Path))

  t.context.file3Path = file3Path

  cmd = `node ${cliPath} ${file2Path} -of js`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file3Path))
})
