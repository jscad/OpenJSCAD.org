const fs = require('fs')
const path = require('path')

const test = require('ava')

const deserializer = require('../src/index')

// const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))
const samplesPath = path.dirname('tests/')

const countOf = (search, string) => {
  let count = 0
  let index = string.indexOf(search)
  while (index !== -1) {
    count++
    index = string.indexOf(search, index + 1)
  }
  return count
}

test('deserialize simple X3D to JSCAD script', (t) => {
  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, example01)
  t.is(countOf('createObjects', observed), 10)
  t.is(countOf('primitives', observed), 3)
  t.is(countOf('applyTransform', observed), 4)
})

test('deserialize X3D 2D components to JSCAD script', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/Geometry2dComponents.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('createObjects', observed), 46)
  t.is(countOf('primitives', observed), 10)
  t.is(countOf('applyTransform', observed), 12)
})

test('deserialize X3D 3D components to JSCAD script', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/Geometry3dComponents.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('createObjects', observed), 20)
  t.is(countOf('primitives', observed), 5)
  t.is(countOf('geom3.fromPoints', observed), 1)
  t.is(countOf('applyTransform', observed), 6)
})

test('deserialize X3D line sets to JSCAD script', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/LineSets.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('createObjects', observed), 12)
  t.is(countOf('primitives.line', observed), 32)
})

test('deserialize X3D elevation grids to JSCAD script', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/ElevationGrids.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('createObjects', observed), 8)
  t.is(countOf('points', observed), 12)
  t.is(countOf('faces', observed), 12)
  t.is(countOf('orientation', observed), 8)
  t.is(countOf('primitives.polyhedron', observed), 4)
  t.is(countOf('applyTransform', observed), 1)
})

test('deserialize X3D 3D triangle sets to JSCAD script', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/TriangleSets.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('createObjects', observed), 18)
  t.is(countOf('points', observed), 12)
  t.is(countOf('faces', observed), 12)
  t.is(countOf('orientation', observed), 8)
  t.is(countOf('primitives.polyhedron', observed), 4)
  t.is(countOf('applyTransform', observed), 1)
})

test('deserialize X3D 3D triangle sets with comma delimiters to JSCAD script', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/TriangleSets_CommaMF.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('createObjects', observed), 18)
  t.is(countOf('points', observed), 12)
  t.is(countOf('faces', observed), 12)
  t.is(countOf('orientation', observed), 8)
  t.is(countOf('primitives.polyhedron', observed), 4)
  t.is(countOf('applyTransform', observed), 1)
})

test('deserialize X3D 3D transforms to JSCAD script', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/Transforms.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('createObjects', observed), 16)
  t.is(countOf('primitives', observed), 5)
  t.is(countOf('applyTransform', observed), 5)
})

test('deserialize X3D 3D indexed triangle sets to JSCAD script', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/IndexedTriangleSets.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('createObjects', observed), 24)
  t.is(countOf('points', observed), 18)
  t.is(countOf('faces', observed), 20)
  t.is(countOf('orientation', observed), 12)
  t.is(countOf('primitives.polyhedron', observed), 6)
  t.is(countOf('applyTransform', observed), 1)
})

test('deserialize X3D 3D indexed triangle sets with comma delimiters to JSCAD script', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/IndexedTriangleSets_CommaMF.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('createObjects', observed), 24)
  t.is(countOf('points', observed), 18)
  t.is(countOf('faces', observed), 20)
  t.is(countOf('orientation', observed), 12)
  t.is(countOf('primitives.polyhedron', observed), 6)
  t.is(countOf('applyTransform', observed), 1)
})

test('deserialize X3D 3D groups to JSCAD script', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/Groups.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'script', addMetaData: false }, inputFile)
  t.is(countOf('createObjects', observed), 20)
  t.is(countOf('primitives', observed), 4)
  t.is(countOf('applyTransform', observed), 6)
})

// EXAMPLES FOR SIMPLE TESTING

const example01 = `
<X3D version='3.0' profile='Interchange'>
  <head>
    <unit category='length' conversionFactor='0.001' name='millimeters'/>
    <meta content='example01.x3d' name='title'/>
  </head>

  <Scene>
    <Transform>
      <Transform translation='3.0 0.0 1.0'>
        <Shape>
          <Sphere radius='2.3'/>
          <Appearance>
            <Material diffuseColor='1.0 0.0 0.0'/>
          </Appearance>
        </Shape>
      </Transform>
      <Transform translation='-2.4 0.2 1.0' rotation='0.0 0.707 0.707 0.9'>
        <Shape>
          <Box/>
          <Appearance>
            <Material diffuseColor='0.0 0.0 1.0'/>
          </Appearance>
        </Shape>
      </Transform>
    </Transform>
  </Scene>
</X3D>
`
