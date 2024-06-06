import test from 'ava'

import { comparePoints } from '../../../test/helpers/index.js'

import { geom2 } from '../../geometries/index.js'

import { measureArea } from '../../measurements/index.js'

import { circle, rectangle, square } from '../../primitives/index.js'

import { center } from '../transforms/index.js'

import { subtract } from './index.js'

test('subtract: subtract of one or more geom2 objects produces expected geometry', (t) => {
  const geometry1 = circle({ radius: 2, segments: 8 })

  // subtract of one object
  const result1 = subtract(geometry1)
  let obs = geom2.toPoints(result1)
  let exp = [
    [2, 0],
    [1.4142135623730951, 1.414213562373095],
    [0, 2],
    [-1.414213562373095, 1.4142135623730951],
    [-2, 0],
    [-1.4142135623730954, -1.414213562373095],
    [0, -2],
    [1.4142135623730947, -1.4142135623730954]
  ]
  t.notThrows(() => geom2.validate(result1))
  t.is(measureArea(result1), 11.31370849898476)
  t.is(obs.length, 8)
  t.true(comparePoints(obs, exp))

  // subtract of two non-overlapping objects
  const geometry2 = center({ relativeTo: [10, 10, 0] }, rectangle({ size: [4, 4] }))

  const result2 = subtract(geometry1, geometry2)
  obs = geom2.toPoints(result2)
  exp = [
    [2, 0],
    [1.4142135623730951, 1.414213562373095],
    [0, 2],
    [-1.414213562373095, 1.4142135623730951],
    [-2, 0],
    [-1.4142135623730954, -1.414213562373095],
    [0, -2],
    [1.4142135623730947, -1.4142135623730954]
  ]
  t.notThrows(() => geom2.validate(result2))
  t.is(measureArea(result2), 11.31370849898476)
  t.is(obs.length, 8)
  t.true(comparePoints(obs, exp))

  // subtract of two partially overlapping objects
  const geometry3 = rectangle({ size: [18, 18] })

  const result3 = subtract(geometry2, geometry3)
  obs = geom2.toPoints(result3)
  exp = [
    [8, 9], [9, 9], [9, 8], [12, 8], [12, 12], [8, 12]
  ]
  t.notThrows(() => geom2.validate(result3))
  t.is(measureArea(result3), 15)
  t.is(obs.length, 6)
  t.true(comparePoints(obs, exp))

  // subtract of two completely overlapping objects
  const result4 = subtract(geometry1, geometry3)
  obs = geom2.toPoints(result4)
  exp = []
  t.notThrows(() => geom2.validate(result4))
  t.is(measureArea(result4), 0)
  t.is(obs.length, 0)
  t.deepEqual(obs, exp)
})

test('subtract with undefined/null values', (t) => {
  const square1 = square({ size: 8 })
  const square2 = square({ size: 6 })
  const square3 = square({ size: 4 })
  const geometries = [square1, undefined, square2, null, square3]

  const obs = subtract(...geometries)
  const pts = geom2.toPoints(obs)
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 8)
})

test('subtract of nested arrays', (t) => {
  const square1 = square({ size: 8 })
  const square2 = square({ size: 6 })
  const square3 = square({ size: 4 })
  const geometries = [square1, [square2, [square3]]]

  const obs = subtract(...geometries)
  const pts = geom2.toPoints(obs)
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 8)
})
