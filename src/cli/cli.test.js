// FIXME: tests are basic 'is the output file there, how  big is it' for now, actual checks are needed !!
const test = require('ava')
const path = require('path')
const {execSync} = require('child_process')
const fs = require('fs')

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
  let jscadPath = './cli'
  t.context = {
    jscadPath: path.resolve(__dirname, jscadPath)
  }
})

test('jscad (basic, input file only)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/logo.jscad')
  const expPath = path.resolve(__dirname, '../../examples/logo.stl')
  t.context = {outputPath: expPath}

  const cmd = `node ${jscadPath} ${inputPath}`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(expPath).size, 338371, 2) // this has to be set this large because of the cross platform differences
})

test('jscad with parameters', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/name_plate.jscad')
  const outputPath = 'JustMe_Geek_name_plate.amf'
  const expPath = outputPath
  t.context = {outputPath}
  const cmd = `node ${jscadPath} ${inputPath} --name "Just Me" --title "Geek" -o ${outputPath} `
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(expPath).size, 655732, 50)
})

test('jscad with complex/ multiple type of parameters', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/grille.jscad')
  const outputPath = 'grille.stl'
  const expPath = outputPath
  t.context = {outputPath}
  const cmd = `node ${jscadPath} ${inputPath} --outerwidth 176.25 --outerdepth 15.2 --numdividers 4 --addlooseners "Yes" --show "grille" --mouseears 0 --quality 0 -o ${outputPath} `
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(expPath).size, 216484, 50)
})

test('jscad to stl (ascii)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/logo.jscad')
  const outputPath = 'test.stl'
  const expPath = 'test.stl'
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stla`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(expPath).size, 338371, 2)
})

test('jscad to stl(binary)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/logo.jscad')
  const outputPath = 'test.stl'
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stlb`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(outputPath))
  // t.deepEqual(fs.readFileSync(expPath), fs.readFileSync(outputPath))
  almostEquals(t, fs.statSync(outputPath).size, 74284, 2)
})

test('jscad to amf', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/logo.jscad')
  const outputPath = 'test.amf'
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of amf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(outputPath))
  almostEquals(t, fs.statSync(outputPath).size, 397341, 50)
})

test('jscad to amf(with transparency)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/transparency.jscad')
  const outputPath = 'test.amf'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of amf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 240108, 50)
})

test('openscad to stl (ascii)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/example001.scad')
  const outputPath = 'test.stl'
  const expPath = 'test.stl'
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stla`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 629242, 100)
})

test('openscad to stl(binary)', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/example001.scad')
  const outputPath = 'test.stl'
  // const expPath = path.resolve(__dirname, '../../examples/logo-binary.stl')
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stlb`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(outputPath))
  // t.deepEqual(fs.readFileSync(expPath), fs.readFileSync(outputPath))
  almostEquals(t, fs.statSync(outputPath).size, 111684, 2)
})

test('openscad to amf', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/example001.scad')
  const outputPath = 'test.amf'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of amf`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 626177, 120)
})

test('openscad to openjscad', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/example001.scad')
  const outputPath = 'test.jscad'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of jscad`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 646, 2)
})

test('openscad to openjscad to stl', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/example001.scad')
  const jscadOutputPath = 'test.jscad'
  const outputPath = 'test.stl'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${jscadOutputPath} -of jscad`
  execSync(cmd, {stdio: [0, 1, 2]})

  const cmd2 = `node ${jscadPath} ${jscadOutputPath} -o ${outputPath}`
  execSync(cmd2, {stdio: [0, 1, 2]})

  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 111684, 2)
})

// NOTE : echo() will likely be deprecated soon, but keeping this around for now
test('echo() support', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/echo.jscad')
  const outputPath = 'test.jscad'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of jscad`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 671, 2)
})

test('include support', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/platonics/main.jscad')
  const outputPath = 'test.stl'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stla`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 19681, 60)
})

test('include support, with sub folders', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/include-subfolder/main.jscad')
  const outputPath = 'test.stl'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of stla`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 281479, 2)
})

test('stl to openjscad', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/thing_7-Zomboe.stl')
  const outputPath = 'test.jscad'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath}`
  execSync(cmd, {stdio: [0, 1, 2]})

  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 3707734, 2)
})

test('amf to openjscad', t => {
  const jscadPath = t.context.jscadPath
  const inputPath = path.resolve(__dirname, '../../examples/amf/Amf_Cube.amf')
  const outputPath = 'test.jscad'
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath}`
  execSync(cmd, {stdio: [0, 1, 2]})

  t.deepEqual(true, fs.existsSync(expPath))
  almostEquals(t, fs.statSync(outputPath).size, 1870, 2)
})

// FIXME: DXF not working
/* test('jscad to dxf', t => {
  const inputPath = path.resolve(__dirname, '../../examples/cnc-cutout.jscad')
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
  const inputPath = path.resolve(__dirname, '../../examples/example001.jscad')
  const outputPath = 'test.svg'
  const jscadPath = t.context.jscadPath
  const expPath = outputPath
  t.context = {outputPath}

  const cmd = `node ${jscadPath} ${inputPath} -o ${outputPath} -of svg`
  execSync(cmd, {stdio: [0, 1, 2]})
  t.deepEqual(true, fs.existsSync(expPath))
}) */
