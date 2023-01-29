import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { cwd } from 'process'

import test from 'ava'

test.afterEach.always((t) => {
  // remove files
  try {
    if (t.context.inputPath) fs.unlinkSync(t.context.inputPath)
  } catch (err) {}

  try {
    if (t.context.outputPath) fs.unlinkSync(t.context.outputPath)
  } catch (err) {}

  try {
    if (t.context.folderPath) fs.rmdirSync(t.context.folderPath, { recursive: false })
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
import { primitives } from '@jscad/modeling'

export const getParameterDefinitions = () => {
  return [
    { name: 'segments', caption: 'Segements:', type: 'int', initial: 10, min: 5, max: 20, step: 1 }
  ]
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

  const fileName = `./test${id}.js`
  const filePath = path.resolve(cwd(), fileName)
  fs.writeFileSync(filePath, jscadScript)
  return filePath
}

test('cli (single input file)', (t) => {
  const testID = 1

  const inputPath = createJscad(testID)
  t.true(fs.existsSync(inputPath))

  t.context.inputPath = inputPath

  const outputName = `./test${testID}.stl`
  const outputPath = path.resolve(cwd(), outputName)
  t.false(fs.existsSync(outputPath))

  t.context.outputPath = outputPath

  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath} ${inputPath}`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(outputPath))
})

test('cli (single input file, output format)', (t) => {
  const testID = 2

  const inputPath = createJscad(testID)
  t.true(fs.existsSync(inputPath))

  t.context.inputPath = inputPath

  const outputName = `./test${testID}.dxf`
  const outputPath = path.resolve(cwd(), outputName)
  t.false(fs.existsSync(outputPath))

  t.context.outputPath = outputPath

  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath} ${inputPath} -of dxf`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(outputPath))
})

test('cli (single input file, output filename)', (t) => {
  const testID = 3

  const inputPath = createJscad(testID)
  t.true(fs.existsSync(inputPath))

  t.context.inputPath = inputPath

  const outputName = `./test${testID}.obj`
  const outputPath = path.resolve(cwd(), outputName)
  t.false(fs.existsSync(outputPath))

  t.context.outputPath = outputPath

  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath} ${inputPath} -o ${outputPath}`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(outputPath))
})

test('cli (folder, output format)', (t) => {
  const testID = 4

  const inputPath = createJscad(testID)
  t.true(fs.existsSync(inputPath))

  t.context.inputPath = inputPath

  const folderPath = path.resolve(cwd(), './test-folder')
  t.false(fs.existsSync(folderPath))

  fs.mkdirSync(folderPath)
  t.true(fs.existsSync(folderPath))

  t.context.folderPath = folderPath

  const mainPath = path.resolve(cwd(), './test-folder/main.js')
  fs.renameSync(inputPath, mainPath)
  t.true(fs.existsSync(mainPath))

  t.context.inputPath = mainPath

  const outputName = './test-folder/main.dxf'
  const outputPath = path.resolve(cwd(), outputName)
  t.false(fs.existsSync(outputPath))

  t.context.outputPath = outputPath

  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath} ${folderPath} -of dxf`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(outputPath))
})

test('cli (single input file, parameters)', (t) => {
  const testID = 5

  const inputPath = createJscad(testID)
  t.true(fs.existsSync(inputPath))

  t.context.inputPath = inputPath

  const outputName = `./test${testID}.stl`
  const outputPath = path.resolve(cwd(), outputName)
  t.false(fs.existsSync(outputPath))

  t.context.outputPath = outputPath

  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath} ${inputPath} --segments 32 --nothing "Yes"`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(outputPath))
})

test('cli (no parameters, out help)', (t) => {
  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath}`
  t.throws(() => {
    execSync(cmd, { stdio: [0, 1, 2] })
  })
})

test('cli (single input file, invalid jscad)', (t) => {
  const testID = 6

  const inputPath = createJscad(testID)
  fs.writeFileSync(inputPath, 'INVALID')
  t.true(fs.existsSync(inputPath))

  t.context.inputPath = inputPath

  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath} ${inputPath}`
  t.throws(() => {
    execSync(cmd, { stdio: [0, 1, 2] })
  })
})
