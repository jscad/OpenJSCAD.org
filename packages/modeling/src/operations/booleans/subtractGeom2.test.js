const test = require('ava')

const { comparePoints } = require('../../../test/helpers')

const { geom2 } = require('../../geometries')

const { circle, rectangle } = require('../../primitives')

const { subtract } = require('./index')

const { center } = require('../transforms/center')

test('subtract: subtract of one or more geom2 objects produces expected geometry', (t) => {
  const geometry1 = circle({ radius: 2, segments: 8 })

  // subtract of one object
  const result1 = subtract(geometry1)
  let obs = geom2.toPoints(result1)
  let exp = [
    [2, 0],
    [1.4142000000000001, 1.4142000000000001],
    [0, 2],
    [-1.4142000000000001, 1.4142000000000001],
    [-2, 0],
    [-1.4142000000000001, -1.4142000000000001],
    [0, -2],
    [1.4142000000000001, -1.4142000000000001]
  ]
  t.notThrows(() => geom2.validate(result1))
  t.is(obs.length, 8)
  t.true(comparePoints(obs, exp))

  // subtract of two non-overlapping objects
  const geometry2 = center({ relativeTo: [10, 10, 0] }, rectangle({ size: [4, 4] }))

  const result2 = subtract(geometry1, geometry2)
  obs = geom2.toPoints(result2)
  exp = [
    [2, 0],
    [1.4142000000000001, 1.4142000000000001],
    [0, 2],
    [-1.4142000000000001, 1.4142000000000001],
    [-2, 0],
    [-1.4142000000000001, -1.4142000000000001],
    [0, -2],
    [1.4142000000000001, -1.4142000000000001]
  ]
  t.notThrows(() => geom2.validate(result2))
  t.is(obs.length, 8)
  t.true(comparePoints(obs, exp))

  // subtract of two partially overlapping objects
  const geometry3 = rectangle({ size: [18, 18] })

  const result3 = subtract(geometry2, geometry3)
  obs = geom2.toPoints(result3)
  exp = [
    [12, 12], [9, 9], [8, 9], [8, 12], [9, 8], [12, 8]
  ]
  t.notThrows(() => geom2.validate(result3))
  t.is(obs.length, 6)
  t.true(comparePoints(obs, exp))

  // subtract of two completely overlapping objects
  const result4 = subtract(geometry1, geometry3)
  obs = geom2.toPoints(result4)
  exp = [
  ]
  t.notThrows(() => geom2.validate(result4))
  t.is(obs.length, 0)
  t.deepEqual(obs, exp)
})
