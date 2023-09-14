const fs = require('fs')
const path = require('path')

const test = require('ava')

const { geometries } = require('@jscad/modeling')

const deserializer = require('../src/index')

// const samplesPath = path.dirname(require.resolve('@jscad/sample-files/package.json'))
const samplesPath = path.dirname('tests/')

test('deserialize simple X3D to JSCAD geometry', (t) => {
  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, example01)
  t.true(Array.isArray(observed))
  t.is(observed.length, 2)
  t.true(geometries.geom3.isA(observed[0]))
  t.true(geometries.geom3.isA(observed[1]))
})

test('deserialize X3D 2D components to JSCAD geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/Geometry2dComponents.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.true(Array.isArray(observed))
  t.is(observed.length, 11)
  t.true(geometries.geom2.isA(observed[0]))
  t.true(geometries.path2.isA(observed[1]))
  t.true(geometries.geom2.isA(observed[2]))
  t.true(geometries.path2.isA(observed[3]))
  t.true(geometries.geom2.isA(observed[4]))
  t.true(geometries.geom2.isA(observed[5]))
  t.true(geometries.geom2.isA(observed[6]))
  t.true(geometries.path2.isA(observed[7]))
  t.true(geometries.geom2.isA(observed[8]))
  t.true(geometries.geom2.isA(observed[9]))
  t.true(geometries.geom2.isA(observed[10]))
})

test('deserialize X3D 3D components to JSCAD geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/Geometry3dComponents.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.true(Array.isArray(observed))
  t.is(observed.length, 5)
  t.true(geometries.geom3.isA(observed[0]))
  t.true(geometries.geom3.isA(observed[1]))
  t.true(geometries.geom3.isA(observed[2]))
  t.true(geometries.geom3.isA(observed[3]))
  t.true(geometries.geom3.isA(observed[4]))
})

test('deserialize X3D line sets to JSCAD geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/LineSets.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.true(Array.isArray(observed))
  t.is(observed.length, 32)
  t.true(geometries.path2.isA(observed[0]))
  t.true(geometries.path2.isA(observed[8]))
  t.true(geometries.path2.isA(observed[16]))
  t.true(geometries.path2.isA(observed[24]))
  t.true(geometries.path2.isA(observed[31]))
})

test('deserialize X3D elevation grids to JSCAD geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/ElevationGrids.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.true(Array.isArray(observed))
  t.is(observed.length, 4)
  t.true(geometries.geom3.isA(observed[0]))
  t.true(geometries.geom3.isA(observed[1]))
  t.true(geometries.geom3.isA(observed[2]))
  t.true(geometries.geom3.isA(observed[3]))
})

test('deserialize X3D 3D triangle sets to JSCAD geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/TriangleSets.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.true(Array.isArray(observed))
  t.is(observed.length, 4)
  t.true(geometries.geom3.isA(observed[0]))
  t.true(geometries.geom3.isA(observed[1]))
  t.true(geometries.geom3.isA(observed[2]))
  t.true(geometries.geom3.isA(observed[3]))
})

test('deserialize X3D 3D triangle sets with comma delimiters to JSCAD geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/TriangleSets_CommaMF.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.true(Array.isArray(observed))
  t.is(observed.length, 4)
  t.true(geometries.geom3.isA(observed[0]))
  t.true(geometries.geom3.isA(observed[1]))
  t.true(geometries.geom3.isA(observed[2]))
  t.true(geometries.geom3.isA(observed[3]))
})

test('deserialize X3D 3D transforms to JSCAD geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/Transforms.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.true(Array.isArray(observed))
  t.is(observed.length, 4)
  t.true(geometries.geom3.isA(observed[0]))
  t.true(geometries.geom3.isA(observed[1]))
  t.true(geometries.geom3.isA(observed[2]))
  t.true(geometries.geom3.isA(observed[3]))
})

test('deserialize X3D 3D indexed triangle sets to JSCAD geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/IndexedTriangleSets.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.true(Array.isArray(observed))
  t.is(observed.length, 6)
  t.true(geometries.geom3.isA(observed[0]))
  t.true(geometries.geom3.isA(observed[1]))
  t.true(geometries.geom3.isA(observed[2]))
  t.true(geometries.geom3.isA(observed[3]))
  t.true(geometries.geom3.isA(observed[4]))
  t.true(geometries.geom3.isA(observed[5]))
})

test('deserialize X3D 3D indexed triangle sets with comma delimiters to JSCAD geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/IndexedTriangleSets_CommaMF.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.true(Array.isArray(observed))
  t.is(observed.length, 6)
  t.true(geometries.geom3.isA(observed[0]))
  t.true(geometries.geom3.isA(observed[1]))
  t.true(geometries.geom3.isA(observed[2]))
  t.true(geometries.geom3.isA(observed[3]))
  t.true(geometries.geom3.isA(observed[4]))
  t.true(geometries.geom3.isA(observed[5]))
})

test('deserialize X3D 3D groups to JSCAD geometry', (t) => {
  const inputPath = path.resolve(samplesPath, 'tests/Groups.x3d')
  const inputFile = fs.readFileSync(inputPath)

  const observed = deserializer.deserialize({ output: 'geometry', addMetaData: false }, inputFile)
  t.true(Array.isArray(observed))
  t.is(observed.length, 7)
  t.true(geometries.geom3.isA(observed[0]))
  t.true(geometries.geom3.isA(observed[1]))
  t.true(geometries.geom3.isA(observed[2]))
  t.true(geometries.geom3.isA(observed[3]))
  t.true(geometries.geom3.isA(observed[4]))
  t.true(geometries.geom3.isA(observed[5]))
  t.true(geometries.geom3.isA(observed[6]))
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
