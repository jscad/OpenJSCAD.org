const test = require('ava')
const path = require('path')
const fs = require('fs')
const openjscad = require('./module')

function almostEquals (t, observed, expected, precision) {
  t.is(Math.abs(expected - observed) < precision, true)
}

test.beforeEach(t => {
})

// FIXME: this goes perhaps into too much implementation detail ?
test('compile', t => {
  const {compile} = openjscad
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')

  const expProperties = {
    cube: { center: { _x: 0, _y: 0, _z: 15 },
      facecenters: [
        {
          point: {
            _x: 15,
            _y: 0,
            _z: 15
          },
          axisvector: {
            _x: 1,
            _y: 0,
            _z: 0
          },
          normalvector: {
            _x: 0,
            _y: 0,
            _z: 1
          }
        },
        {
          point: {
            _x: -15,
            _y: 0,
            _z: 15
          },
          axisvector: {
            _x: -1,
            _y: 0,
            _z: 0
          },
          normalvector: {
            _x: 0,
            _y: 0,
            _z: 1
          }
        },
        {
          point: {
            _x: 0,
            _y: 15,
            _z: 15
          },
          axisvector: {
            _x: 0,
            _y: 1,
            _z: 0
          },
          normalvector: {
            _x: 0,
            _y: 0,
            _z: 1
          }
        },
        {
          point: {
            _x: 0,
            _y: -15,
            _z: 15
          },
          axisvector: {
            _x: 0,
            _y: -1,
            _z: 0
          },
          normalvector: {
            _x: 0,
            _y: 0,
            _z: 1
          }
        },
        {
          point: {
            _x: 0,
            _y: 0,
            _z: 30
          },
          axisvector: {
            _x: 0,
            _y: 0,
            _z: 1
          },
          normalvector: {
            _x: 1,
            _y: 0,
            _z: 0
          }
        },
        {
          point: {
            _x: 0,
            _y: 0,
            _z: 0
          },
          axisvector: {
            _x: 0,
            _y: 0,
            _z: -1
          },
          normalvector: {
            _x: 1,
            _y: 0,
            _z: 0
          }
        }
      ]
    },
    sphere: { center: { _x: 0, _y: 0, _z: 15 },
  facepoint: { _x: 20, _y: 0, _z: 15 } } }
  return compile(script, {})
    .then(function (objects) {
      const object = objects[0]
      t.deepEqual(Object.keys(object).sort(), ['polygons', 'properties', 'isCanonicalized', 'isRetesselated'].sort())
      t.deepEqual(object.polygons.length, 610)
      t.deepEqual(object.properties, expProperties)
      t.deepEqual(object.isCanonicalized, true)
      t.deepEqual(object.isRetesselated, true)
    })
})


test('compile, with include() support', t => {
  const {compile} = openjscad
  const inputPath = path.resolve(__dirname, '../examples/platonics/main.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')

  return compile(script, {}, {rootPath: inputPath})
    .then(function (objects) {
      const object = objects[0]
      t.deepEqual(Object.keys(object).sort(), ['polygons', 'properties', 'isCanonicalized', 'isRetesselated'].sort())
      t.deepEqual(object.polygons.length, 4)
    })
})

test('generateOutput(stl)', t => {
  const {generateOutput} = openjscad
  // FIXME : create a fake csgObject rather than using output from another function
  // NOT so easy because of prototypes (typeOf in convertToBlob (could be replaced by fields on ojbects))
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')

  return openjscad.compile(script, {})
    .then(function (input) {
      const output = generateOutput('stl', input)
      const {type, encoding, size} = output // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)
      t.is(type, 'application/sla')
      t.is(encoding, 'utf8')
      t.is(size, 70284)
    })
})

test('generateOutput(stla)', t => {
  const {generateOutput} = openjscad
  // FIXME : create a fake csgObject rather than using output from another function
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')
  // const input = openjscad.compile(script, {})

  return openjscad.compile(script, {})
    .then(function (input) {
      const output = generateOutput('stla', input)
      const {type, encoding, size} = output // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)
      t.is(type, 'application/sla')
      t.is(encoding, 'utf8')
      t.is(size, 326185)
    })
})

test('generateOutput(stlb)', t => {
  const {generateOutput} = openjscad
  // FIXME : create a fake csgObject rather than using output from another function
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')
  // const input = openjscad.compile(script, {})

  return openjscad.compile(script, {})
    .then(function (input) {
      const output = generateOutput('stlb', input)
      const {type, encoding, size} = output // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)
      t.is(type, 'application/sla')
      t.is(encoding, 'utf8')
      t.is(size, 70284)
    })
})

test('generateOutput(amf)', t => {
  const {generateOutput} = openjscad
  // FIXME : create a fake csgObject rather than using output from another function
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')
  // const input = openjscad.compile(script, {})
  return openjscad.compile(script, {})
    .then(function (input) {
      const output = generateOutput('amf', input)
      const {type, encoding, size} = output // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)
      t.is(type, 'application/amf+xml')
      t.is(encoding, 'utf8')
      almostEquals(t, size, 385247, 50)
    })
})

test('generateOutput(x3d)', t => {
  const {generateOutput} = openjscad
  // FIXME : create a fake csgObject rather than using output from another function
  const inputPath = path.resolve(__dirname, '../examples/logo.jscad')
  const script = fs.readFileSync(inputPath, 'UTF8')

  return openjscad.compile(script, {})
    .then(function (input) {
      const output = generateOutput('x3d', input)
      const {type, encoding, size} = output // FIXME for some reason this fails ?t.is(output.encoding, 'foo' when falsy)
      t.is(type, 'model/x3d+xml')
      t.is(encoding, 'utf8')
      almostEquals(t, size, 44066, 50)
    })
})

test('generateOutput(stl, from csg object)', t => {
  const {generateOutput} = openjscad

  const csg = require('@jscad/csg').CSG
  const input = csg.cube([1, 1, 1])

  const output = generateOutput('stl', input)
  const {type, encoding, size} = output
  t.is(type, 'application/sla')
  t.is(encoding, 'utf8')
  almostEquals(t, size, 684, 50)
})
