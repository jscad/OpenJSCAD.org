// FIXME: tests are basic 'is the output file there, how  big is it' for now, actual checks are needed !!
import test from 'ava'
import path from 'path'
import {execSync} from 'child_process'
import fs from 'fs'

function almostEquals (t, observed, expected, precision) {
  t.is(Math.abs(expected - observed) < precision, true)
}

// NOTE : use   // --inspect --debug-brk to debug node commands in chrome
test.afterEach.always(t => {
    // this runs after each test and other test hooks, even if they failed
    // remove created file
  try {
    fs.unlinkSync(t.context.outputPath)
  } catch (err) {}
})

test.beforeEach(t => {
  let jscadPath = '../dist/cli'
  t.context = {
    jscadPath: path.resolve(__dirname, jscadPath)
  }
})

test('jscad (basic, input file only)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const expPath = path.resolve(__dirname, '../examples/logo.stl')
  t.context = {outputPath: expPath}

  const cmd = `node ${jscadPath} ${inputPath}`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(expPath).size, 326185, 2)
})

test('jscad with parameters', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/name_plate.jscad')
  const outputPath = 'JustMe_Geek_name_plate.amf'
  const expPath = outputPath
  t.context = {outputPath}
  const cmd = `node ${jscadPath} ${inputPath} --name "Just Me" --title "Geek" -o ${outputPath} `
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(expPath).size, 575987, 2)
})

test('jscad to stl (ascii)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const outputPath = 'test.stl'
  const expPath = 'test.stl'
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} `
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(expPath).size, 326185, 2)
})

test('jscad to stl(binary)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const outputPath = 'test.stl'
  const expPath = path.resolve(__dirname, '../examples/logo-binary.stl')
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stlb`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(outputPath))
  // t.deepEqual(fs.readFileSync(expPath), fs.readFileSync(outputPath))
  almostEquals(t, fs.statSync(outputPath).size, 70284, 2)
})

test('jscad to amf', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const outputPath = 'test.amf'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of amf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(outputPath))
  almostEquals(t, fs.statSync(outputPath).size, 385246, 2)
})

test('jscad to amf(with transparency)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/transparency.jscad')
  const outputPath = 'test.amf'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of amf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 240108, 2)
})

// FIXME: DXF not working
/* test('jscad to dxf', t => {
  const inputPath = path.resolve(__dirname, '../examples/cnc-cutout.jscad')
  const outputPath = 'test.dxf'
  const jscadPath = t.context.jscadPath
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of dxf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})

//FIXME: svg not working
test('jscad to svg', t => {
  const inputPath = path.resolve(__dirname, '../examples/example001.jscad')
  const outputPath = 'test.svg'
  const jscadPath = t.context.jscadPath
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of svg`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
}) */

test('openscad to stl (ascii)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/example001.scad')
  const outputPath = 'test.stl'
  const expPath = 'test.stl'
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} `
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 515365, 2)
})

test('openscad to stl(binary)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/example001.scad')
  const outputPath = 'test.stl'
  // const expPath = path.resolve(__dirname, '../examples/logo-binary.stl')
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stlb`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(outputPath))
  // t.deepEqual(fs.readFileSync(expPath), fs.readFileSync(outputPath))
  almostEquals(t, fs.statSync(outputPath).size, 91884, 2)
})

test('openscad to amf', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/example001.scad')
  const outputPath = 'test.amf'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of amf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 554920, 2)
})

test('openscad to openjscad', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/example001.scad')
  const outputPath = 'test.jscad'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of jscad`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 876, 2)
})

// NOTE : echo() will likely be deprecated soon, but keeping this around for now
test('echo() support', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/echo.jscad')
  const outputPath = 'test.jscad'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of jscad`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 454, 2)
})

test('include support', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../examples/platonics/main.jscad')
  const outputPath = 'test.stl'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stl`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 19681, 2)
})
