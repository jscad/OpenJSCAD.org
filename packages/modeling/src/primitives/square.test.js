import test from 'ava'

import { geom2 } from '../geometries/index.js'

import { square } from './index.js'

import { comparePoints } from '../../test/helpers/index.js'

test('square (defaults)', (t) => {
  const geometry = square()
  const obs = geom2.toPoints(geometry)
  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 4)
})

test('square (options)', (t) => {
  // test center
  let obs = square({ size: 7, center: [6.5, 6.5] })
  let pts = geom2.toPoints(obs)
  let exp = [
    [3, 3],
    [10, 3],
    [10, 10],
    [3, 10]
  ]

  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 4)
  t.true(comparePoints(pts, exp))

  // test size
  obs = square({ size: 7 })
  pts = geom2.toPoints(obs)
  exp = [
    [-3.5, -3.5],
    [3.5, -3.5],
    [3.5, 3.5],
    [-3.5, 3.5]
  ]

  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 4)
  t.true(comparePoints(pts, exp))
})
