const test = require('ava')

const path = require('path')
const { execSync } = require('child_process')
const fs = require('fs')

test.afterEach.always(t => {
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

test.beforeEach(t => {
  const cliName = './cli.js'
  t.context = {
    cliPath: path.resolve(__dirname, cliName)
  }
})

// CORE FUNCTIONALITY

// These tests create input and output files.

// create a simple JSCAD script for input
// the script should produce ALL geometry types
const createJscad = (id) => {
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

  return [apath2, ageom2, ageom3]
}

module.exports = { main, getParameterDefinitions }
`

  const fileName = `./test${id}.jscad`
  const filePath = path.resolve(__dirname, fileName)
  fs.writeFileSync(filePath, jscadScript)
  return filePath
}

test('cli (conversions)', t => {
  const testID = 11

  // convert from JSCAD script to STL
  const file1Path = createJscad(testID)
  t.true(fs.existsSync(file1Path))

  t.context.file1Path = file1Path

  const file2Name = `./test${testID}.stl`
  const file2Path = path.resolve(__dirname, file2Name)
  t.false(fs.existsSync(file2Path))

  t.context.file2Path = file2Path

  const cliPath = t.context.cliPath

  let cmd = `node ${cliPath} ${file1Path}`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file2Path))

  // convert from STL to JSCAD script
  const file3Name = `./test${testID}.js`
  const file3Path = path.resolve(__dirname, file3Name)
  t.false(fs.existsSync(file3Path))

  t.context.file3Path = file3Path

  cmd = `node ${cliPath} ${file2Path} -o ${file3Path} -v -add-metadata false`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file3Path))

  // convert from STL to DXF
  const file4Name = `./test${testID}.dxf`
  const file4Path = path.resolve(__dirname, file4Name)
  t.false(fs.existsSync(file4Path))

  t.context.file4Path = file4Path

  cmd = `node ${cliPath} ${file2Path} -of dxf`
  execSync(cmd, { stdio: [0, 1, 2] })
  t.true(fs.existsSync(file4Path))
})
