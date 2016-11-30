//FIXME: tests are basic 'is the output file there' for now, actual checks are needed !!
import test from 'ava'
import path from 'path'
import {execSync} from 'child_process'
import fs from 'fs'

test.afterEach.always(t => {
    // this runs after each test and other test hooks, even if they failed
    //remove created file
    try{
      fs.unlinkSync(t.context.outputPath)
    }catch(err){}
})

test.beforeEach(t => {
  let jscadPath = '../openjscad'
  t.context = {
    jscadPath : path.resolve(__dirname, jscadPath)
  }
})

test('jscad (basic, input file only)', t => {
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const jscadPath = t.context.jscadPath
  const expPath = path.resolve(__dirname, '../examples/logo.stl')
  t.context = {outputPath: expPath}

  const cmd = `node ${jscadPath} ${inputPath}`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})

test('jscad with parameters', t => {
  const inputPath = path.resolve(__dirname, '../examples/name_plate.jscad')
  const outputPath = 'JustMe_Geek_name_plate.amf'
  const jscadPath = t.context.jscadPath
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} --name "Just Me" --title "Geek" -o ${outputPath} `
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})

test('jscad to stl (ascii)', t => {
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const outputPath = 'test.stl'
  const jscadPath = t.context.jscadPath
  const expPath = 'test.stl'
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} `
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})

test('jscad to stl(binary)', t => {
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const outputPath = 'test.stl'
  const jscadPath = t.context.jscadPath
  const expPath = path.resolve(__dirname, '../examples/logo-binary.stl')
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stlb`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(outputPath))
  //t.deepEqual(fs.readFileSync(expPath), fs.readFileSync(outputPath))
})

test('jscad to amf', t => {
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const outputPath = 'test.amf'
  const jscadPath = t.context.jscadPath
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of amf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})

test('jscad to amf(with transparency)', t => {
  const inputPath = path.resolve(__dirname, '../examples/transparency.jscad')
  const outputPath = 'test.amf'
  const jscadPath = t.context.jscadPath
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of amf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})

//FIXME: DXF not working
/*test('jscad to dxf', t => {
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
})*/

test('openscad to stl (ascii)', t => {
  const inputPath = path.resolve(__dirname, '../examples/example001.scad')
  const outputPath = 'test.stl'
  const jscadPath = t.context.jscadPath
  const expPath = 'test.stl'
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} `
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})

test('openscad to stl(binary)', t => {
  const inputPath = path.resolve(__dirname, '../examples/example001.scad')
  const outputPath = 'test.stl'
  const jscadPath = t.context.jscadPath
  //const expPath = path.resolve(__dirname, '../examples/logo-binary.stl')
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stlb`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(outputPath))
  //t.deepEqual(fs.readFileSync(expPath), fs.readFileSync(outputPath))
})

test('openscad to amf', t => {
  const inputPath = path.resolve(__dirname, '../examples/example001.scad')
  const outputPath = 'test.amf'
  const jscadPath = t.context.jscadPath
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of amf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})

test('openscad to openjscad', t => {
  const inputPath = path.resolve(__dirname, '../examples/example001.scad')
  const outputPath = 'test.jscad'
  const jscadPath = t.context.jscadPath
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of jscad`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
})
