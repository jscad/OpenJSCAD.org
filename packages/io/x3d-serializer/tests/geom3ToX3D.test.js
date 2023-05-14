const test = require('ava')

const countOf = require('../../test/helpers/countOf')

const { colors, geometries, primitives, transforms } = require('@jscad/modeling')

const serializer = require('../src/index.js')

test('serialize 3D geometry to X3D IndexedTriangleSet', (t) => {
  const geom1 = geometries.geom3.create()

  let results = serializer.serialize({}, geom1)
  t.is(results.length, 1)

  let obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 3)
  t.is(countOf('name', obs), 3)
  t.is(countOf('content', obs), 3)
  t.is(countOf('Created by JSCAD', obs), 1)
  t.is(countOf('Scene', obs), 2)

  const geom2 = primitives.cube()

  results = serializer.serialize({ metadata: false }, geom2)
  t.is(results.length, 1)

  obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 1)
  t.is(countOf('name', obs), 1)
  t.is(countOf('content', obs), 1)
  t.is(countOf('Created by JSCAD', obs), 1)
  t.is(countOf('Scene', obs), 2)
  t.is(countOf('Transform', obs), 2)
  t.is(countOf('Shape', obs), 2)
  t.is(countOf('DEF', obs), 0)
  t.is(countOf('IndexedTriangleSet', obs), 2)
  t.is(countOf('Coordinate', obs), 1)
  t.is(countOf('Color', obs), 1)

  const geom3 = colors.colorize([0.5, 1, 0.5, 1.0], transforms.center({ relativeTo: [5, 5, 5] }, primitives.cube()))
  geom2.id = geom3.id = 'g23'

  results = serializer.serialize({ metadata: false }, geom2, geom3)
  t.is(results.length, 1)

  obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 1)
  t.is(countOf('name', obs), 1)
  t.is(countOf('content', obs), 1)
  t.is(countOf('Created by JSCAD', obs), 1)
  t.is(countOf('Scene', obs), 2)
  t.is(countOf('Shape', obs), 4)
  t.is(countOf('DEF', obs), 2)
  t.is(countOf('IndexedTriangleSet', obs), 4)
  t.is(countOf('Coordinate', obs), 2)
  // for color
  t.is(countOf('<Color', obs), 1)
  t.is(countOf('Appearance', obs), 4)
  // for RGB
  t.is(countOf('diffuseColor="0.5 1 0.5"', obs), 1)
  t.is(countOf('specularColor', obs), 1)
  // for facets
  t.is(countOf('normalPerVertex="false"', obs), 2)
})
