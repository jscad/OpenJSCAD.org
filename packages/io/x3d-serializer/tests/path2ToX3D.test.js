import test from 'ava'

import { countOf } from '../../test/helpers/countOf.js'

import { arc, colorize, path2 } from '@jscad/modeling'

import { serialize } from '../src/index.js'

test('serialize 2D path to X3D Polyline2D', (t) => {
  const p1 = path2.create()

  let results = serialize({}, p1)
  t.is(results.length, 1)

  let obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('meta', obs), 3)
  t.is(countOf('name', obs), 3)
  t.is(countOf('content', obs), 3)
  t.is(countOf('Created by JSCAD', obs), 1)

  const p2 = arc({ center: [5, 5], endAngle: 45, segments: 16 })

  results = serialize({ metadata: false }, p2)
  t.is(results.length, 1)

  obs = results[0]
  t.is(countOf('X3D', obs), 2)
  t.is(countOf('head', obs), 2)
  t.is(countOf('Scene', obs), 2)
  t.is(countOf('Shape', obs), 2)
  t.is(countOf('Polyline2D', obs), 1)
  t.is(countOf('lineSegments', obs), 1)

  const p3 = colorize([0, 0, 0], p2)

  results = serialize({ metadata: false }, p2, p3)
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
