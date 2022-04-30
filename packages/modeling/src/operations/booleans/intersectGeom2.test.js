const test = require('ava')

const { comparePoints } = require('../../../test/helpers')

const { geom2 } = require('../../geometries')

const { circle, rectangle } = require('../../primitives')

const { intersect } = require('./index')

const { center } = require('../transforms/center')

test('intersect: intersect of one or more geom2 objects produces expected geometry', (t) => {
  const geometry1 = circle({ radius: 2, segments: 8 })

  // intersect of one object
  const result1 = intersect(geometry1)
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

  // intersect of two non-overlapping objects
  const geometry2 = center({ relativeTo: [10, 10, 0] }, rectangle({ size: [4, 4] }))

  const result2 = intersect(geometry1, geometry2)
  obs = geom2.toPoints(result2)
  t.notThrows(() => geom2.validate(result2))
  t.is(obs.length, 0)

  // intersect of two partially overlapping objects
  const geometry3 = rectangle({ size: [18, 18] })

  const result3 = intersect(geometry2, geometry3)
  obs = geom2.toPoints(result3)
  exp = [
    [9, 9], [8, 9], [8, 8], [9, 8]
  ]
  t.notThrows(() => geom2.validate(result3))
  t.is(obs.length, 4)
  t.true(comparePoints(obs, exp))

  // intersect of two completely overlapping objects
  const result4 = intersect(geometry1, geometry3)
  obs = geom2.toPoints(result4)
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
  t.notThrows(() => geom2.validate(result4))
  t.is(obs.length, 8)
  t.true(comparePoints(obs, exp))
})
