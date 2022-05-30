const test = require('ava')

const geom3 = require('../geometries/geom3')

const { cuboid } = require('./index')

const comparePolygonsAsPoints = require('../../test/helpers/comparePolygonsAsPoints')

test('cuboid (defaults)', (t) => {
  const obs = cuboid()
  const pts = geom3.toPoints(obs)
  const exp = [
    [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
    [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
    [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
    [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
    [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
    [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('cuboid (options)', (t) => {
  // test center
  let obs = cuboid({ size: [6, 6, 6], center: [3, 5, 7] })
  let pts = geom3.toPoints(obs)
  let exp = [
    [[0, 2, 4], [0, 2, 10], [0, 8, 10], [0, 8, 4]],
    [[6, 2, 4], [6, 8, 4], [6, 8, 10], [6, 2, 10]],
    [[0, 2, 4], [6, 2, 4], [6, 2, 10], [0, 2, 10]],
    [[0, 8, 4], [0, 8, 10], [6, 8, 10], [6, 8, 4]],
    [[0, 2, 4], [0, 8, 4], [6, 8, 4], [6, 2, 4]],
    [[0, 2, 10], [6, 2, 10], [6, 8, 10], [0, 8, 10]]
  ]

  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))

  // test size
  obs = cuboid({ size: [4.5, 1.5, 7] })
  pts = geom3.toPoints(obs)
  exp = [
    [[-2.25, -0.75, -3.5], [-2.25, -0.75, 3.5], [-2.25, 0.75, 3.5], [-2.25, 0.75, -3.5]],
    [[2.25, -0.75, -3.5], [2.25, 0.75, -3.5], [2.25, 0.75, 3.5], [2.25, -0.75, 3.5]],
    [[-2.25, -0.75, -3.5], [2.25, -0.75, -3.5], [2.25, -0.75, 3.5], [-2.25, -0.75, 3.5]],
    [[-2.25, 0.75, -3.5], [-2.25, 0.75, 3.5], [2.25, 0.75, 3.5], [2.25, 0.75, -3.5]],
    [[-2.25, -0.75, -3.5], [-2.25, 0.75, -3.5], [2.25, 0.75, -3.5], [2.25, -0.75, -3.5]],
    [[-2.25, -0.75, 3.5], [2.25, -0.75, 3.5], [2.25, 0.75, 3.5], [-2.25, 0.75, 3.5]]
  ]

  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('cuboid (zero size)', (t) => {
  const obs = cuboid({ size: [1, 1, 0] })
  const pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 0)
})
