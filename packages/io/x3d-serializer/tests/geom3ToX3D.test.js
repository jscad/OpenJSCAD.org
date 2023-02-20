import test from 'ava'

import { countOf } from '../../test/helpers/countOf.js'

import { colors, geometries, primitives, transforms } from '@jscad/modeling'

import { serialize } from '../src/index.js'

test('serialize 3D geometry to X3D IndexedTriangleSet', (t) => {
  const geom1 = geometries.geom3.create()

  let results = serialize({}, geom1)
  t.is(results.length, 1)

  let obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 3)
  t.is(countOf('name', obs), 3)
  t.is(countOf('content', obs), 3)
  t.is(countOf('Created by JSCAD', obs), 1)
  t.is(countOf('Scene', obs), 1)

  const geom2 = primitives.cube()

  results = serialize({ metadata: false }, geom2)
  t.is(results.length, 1)

  obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 1)
  t.is(countOf('name', obs), 1)
  t.is(countOf('content', obs), 1)
  t.is(countOf('Created by JSCAD', obs), 1)
  t.is(countOf('Scene', obs), 2)
  t.is(countOf('Shape', obs), 2)
  t.is(countOf('IndexedTriangleSet', obs), 2)
  t.is(countOf('Coordinate', obs), 1)
  t.is(countOf('Color', obs), 1)

  const geom3 = colors.colorize([0.5, 1, 0.5, 1.0], transforms.center({ relativeTo: [5, 5, 5] }, primitives.cube()))

  results = serialize({ metadata: false }, geom2, geom3)
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
  t.is(countOf('IndexedTriangleSet', obs), 4)
  t.is(countOf('Coordinate', obs), 2)
  // for color
  t.is(countOf('Color', obs), 3)
  t.is(countOf('Appearance', obs), 2)
})
