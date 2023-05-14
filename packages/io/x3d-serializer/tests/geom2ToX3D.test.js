const test = require('ava')

const countOf = require('../../test/helpers/countOf')

const { colors, geometries, primitives } = require('@jscad/modeling')

const { serialize } = require('../src/index.js')

test('serialize 2D geometry to X3D Polyline2D', (t) => {
  const shape1 = geometries.geom2.create()

  let results = serialize({}, shape1)
  t.is(results.length, 1)

  let obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 3)
  t.is(countOf('name', obs), 3)
  t.is(countOf('content', obs), 3)
  t.is(countOf('Created by JSCAD', obs), 1)
  t.is(countOf('Scene', obs), 2)
  t.is(countOf('Group', obs), 1)

  const shape2 = primitives.rectangle()

  results = serialize({ metadata: false }, shape2)
  t.is(results.length, 1)

  obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 1)
  t.is(countOf('name', obs), 1)
  t.is(countOf('content', obs), 1)
  t.is(countOf('Created by JSCAD', obs), 1)
  t.is(countOf('Scene', obs), 2)
  t.is(countOf('Group', obs), 2)
  t.is(countOf('Shape', obs), 2)
  t.is(countOf('Polyline2D', obs), 1)

  const shape3 = colors.colorize([0, 0, 0], shape2)

  results = serialize({ metadata: false }, shape3)
  t.is(results.length, 1)

  obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 1)
  t.is(countOf('name', obs), 1)
  t.is(countOf('content', obs), 1)
  t.is(countOf('Created by JSCAD', obs), 1)
  t.is(countOf('Scene', obs), 2)
  t.is(countOf('Group', obs), 2)
  t.is(countOf('Shape', obs), 2)
  t.is(countOf('Polyline2D', obs), 1)
  // for color
  t.is(countOf('Appearance', obs), 2)
  t.is(countOf('Material', obs), 1)
  t.is(countOf('diffuseColor', obs), 0)
  t.is(countOf('emissiveColor', obs), 1)

  results = serialize({ metadata: false }, shape2, shape3)
  t.is(results.length, 1)

  obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 1)
  t.is(countOf('name', obs), 1)
  t.is(countOf('content', obs), 1)
  t.is(countOf('Created by JSCAD', obs), 1)
  t.is(countOf('Scene', obs), 2)
  t.is(countOf('Group', obs), 4)
  t.is(countOf('Shape', obs), 4)
  t.is(countOf('Polyline2D', obs), 2)
  // for color
  t.is(countOf('Appearance', obs), 2)
  t.is(countOf('Material', obs), 1)
  t.is(countOf('diffuseColor', obs), 0)
  t.is(countOf('specularColor', obs), 0)
  t.is(countOf('emissiveColor', obs), 1)
})
