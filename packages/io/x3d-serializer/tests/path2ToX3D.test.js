const test = require('ava')

const countOf = require('../../test/helpers/countOf')

const { colors, geometries, primitives } = require('@jscad/modeling')

const { serialize } = require('../src/index.js')

test('serialize 2D path to X3D Polyline2D', (t) => {
  const path1 = geometries.path2.create()

  let results = serialize({}, path1)
  t.is(results.length, 1)

  let obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 3)
  t.is(countOf('name', obs), 3)
  t.is(countOf('content', obs), 3)
  t.is(countOf('Created by JSCAD', obs), 1)

  const path2 = primitives.arc({ center: [5, 5], endAngle: 45, segments: 16 })

  results = serialize({ metadata: false }, path2)
  t.is(results.length, 1)

  obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('Scene', obs), 2)
  t.is(countOf('Shape', obs), 2)
  t.is(countOf('Polyline2D', obs), 1)
  t.is(countOf('lineSegments', obs), 1)

  const path3 = colors.colorize([0, 0, 0], path2)

  results = serialize({ metadata: false }, path2, path3)
  t.is(results.length, 1)

  obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('Scene', obs), 2)
  t.is(countOf('Shape', obs), 4)
  t.is(countOf('Polyline2D', obs), 2)
  t.is(countOf('lineSegments', obs), 2)
  // and color on path3
  t.is(countOf('Appearance', obs), 2)
  t.is(countOf('Material', obs), 1)
  t.is(countOf('diffuseColor', obs), 0)
  t.is(countOf('emissiveColor', obs), 1)
})
