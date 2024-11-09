const test = require('ava')
const JSZip = require('jszip')

const path = require('path')
const { execSync } = require('child_process')
const fs = require('fs')

test.afterEach.always((t) => {
  // remove files
  try {
    if (t.context.inputPath) fs.unlinkSync(t.context.inputPath)
  } catch (err) {}

  try {
    if (t.context.outputPath) fs.unlinkSync(t.context.outputPath)
  } catch (err) {}
  try {
    if (t.context.outputPath2) fs.unlinkSync(t.context.outputPath2)
  } catch (err) {}
  try {
    if (t.context.outputPath3) fs.unlinkSync(t.context.outputPath3)
  } catch (err) {}

  try {
    if (t.context.folderPath) fs.rmdirSync(t.context.folderPath, { recursive: false })
  } catch (err) {}
})

test.beforeEach((t) => {
  const cliName = './cli.js'
  t.context = {
    cliPath: path.resolve(__dirname, cliName)
  }
})

// CORE FUNCTIONALITY

// These tests create input and output files.

// create a simple JSCAD script for input
// the script should produce ALL geometry types
const createJscad = (id, multipart = false) => {
  const jscadScript = `// test script ${id}
const { primitives } = require('@jscad/modeling')

const getParameterDefinitions = () => {
  return [
    { name: 'segments', caption: 'Segements:', type: 'int', initial: 10, min: 5, max: 20, step: 1 }
  ]
}

const main = (params) => {
  // parameters
  let segments = params.segments || 16

  // shapes
  let apath2 = primitives.arc()
  let ageom2 = primitives.ellipse()
  let ageom3 = primitives.ellipsoid()

  ${multipart ? 'return [ageom3, ageom3, ageom3]' : 'return [apath2, ageom2, ageom3]'}
}

module.exports = { main, getParameterDefinitions }
`

  const fileName = `./test${id}.jscad`
  const filePath = path.resolve(__dirname, fileName)
  fs.writeFileSync(filePath, jscadScript)
  return filePath
}

test('cli (single input file)', (t) => {
  const testID = 1

  const inputPath = createJscad(testID)
  t.true(fs.existsSync(inputPath))

  t.context.inputPath = inputPath

  const outputName = `./test${testID}.stl`
  const outputPath = path.resolve(__dirname, outputName)
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
  const outputPath = path.resolve(__dirname, outputName)
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

  const outputName = `./test${testID}.amf`
  const outputPath = path.resolve(__dirname, outputName)
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

  const folderPath = path.resolve(__dirname, './test-folder')
  t.false(fs.existsSync(folderPath))

  fs.mkdirSync(folderPath)
  t.true(fs.existsSync(folderPath))

  t.context.folderPath = folderPath

  const mainPath = path.resolve(__dirname, './test-folder/main.js')
  fs.renameSync(inputPath, mainPath)
  t.true(fs.existsSync(mainPath))

  t.context.inputPath = mainPath

  const outputName = './test-folder/main.dxf'
  const outputPath = path.resolve(__dirname, outputName)
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
  const outputPath = path.resolve(__dirname, outputName)
  t.false(fs.existsSync(outputPath))

  t.context.outputPath = outputPath

  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath} ${inputPath} --segments 32 --nothing "Yes"`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(outputPath))
})

test('cli (no parameters)', (t) => {
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

test('cli (single input file, multiple output files)', (t) => {
  const testID = 7

  const inputPath = createJscad(testID, true)
  t.true(fs.existsSync(inputPath))

  t.context.inputPath = inputPath

  const outputName = (partNum) => `./test${testID}-part-${partNum}-of-3.stl`
  const outputPath1 = path.resolve(__dirname, outputName(1))
  const outputPath2 = path.resolve(__dirname, outputName(2))
  const outputPath3 = path.resolve(__dirname, outputName(3))
  t.false(fs.existsSync(outputPath1))
  t.false(fs.existsSync(outputPath2))
  t.false(fs.existsSync(outputPath3))

  t.context.outputPath = outputPath1
  t.context.outputPath2 = outputPath2
  t.context.outputPath3 = outputPath3

  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath} ${inputPath} -gp`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(outputPath1))
  t.true(fs.existsSync(outputPath2))
  t.true(fs.existsSync(outputPath3))
})

test('cli (single multipart input file, zipped output file)', async (t) => {
  const testID = 8

  const inputPath = createJscad(testID, true)
  t.true(fs.existsSync(inputPath))

  t.context.inputPath = inputPath

  const outputName = `./test${testID}.zip`
  const outputPath = path.resolve(__dirname, outputName)

  t.false(fs.existsSync(outputPath))

  t.context.outputPath = outputPath

  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath} ${inputPath} -gp -z`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(outputPath))

  // check contents of zip file
  const data = await fs.promises.readFile(outputPath)
  const content = await JSZip.loadAsync(data)
  t.true(content.files[path.resolve(__dirname, `./test${testID}-part-1-of-3.stl`)] !== undefined)
  t.true(content.files[path.resolve(__dirname, `./test${testID}-part-2-of-3.stl`)] !== undefined)
  t.true(content.files[path.resolve(__dirname, `./test${testID}-part-3-of-3.stl`)] !== undefined)
})

test('cli (single input file, zipped output file)', async (t) => {
  const testID = 9

  const inputPath = createJscad(testID, true)
  t.true(fs.existsSync(inputPath))

  t.context.inputPath = inputPath

  const outputName = `./test${testID}.zip`
  const outputPath = path.resolve(__dirname, outputName)

  t.false(fs.existsSync(outputPath))

  t.context.outputPath = outputPath

  const cliPath = t.context.cliPath

  const cmd = `node ${cliPath} ${inputPath} -z`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(outputPath))

  // check contents of zip file
  const data = await fs.promises.readFile(outputPath)
  const content = await JSZip.loadAsync(data)
  t.true(content.files[path.resolve(__dirname, `./test${testID}.stl`)] !== undefined)
})
