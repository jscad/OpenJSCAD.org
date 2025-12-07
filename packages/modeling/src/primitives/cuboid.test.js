import test from 'ava'

import { geom3 } from '../geometries/index.js'

import { measureArea, measureVolume } from '../measurements/index.js'

import { cuboid } from './index.js'

import { comparePolygonsAsPoints } from '../../test/helpers/index.js'

test('cuboid (defaults)', (t) => {
  const obs = cuboid()
  const pts = geom3.toVertices(obs)
  const exp = [
    [[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
    [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
    [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
    [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
    [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
    [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 24)
  t.is(measureVolume(obs), 7.999999999999999)
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('cuboid (options)', (t) => {
  // test center
  let obs = cuboid({ size: [6, 6, 6], center: [3, 5, 7] })
  let pts = geom3.toVertices(obs)
  let exp = [
    [[0, 2, 4], [0, 2, 10], [0, 8, 10], [0, 8, 4]],
    [[6, 2, 4], [6, 8, 4], [6, 8, 10], [6, 2, 10]],
    [[0, 2, 4], [6, 2, 4], [6, 2, 10], [0, 2, 10]],
    [[0, 8, 4], [0, 8, 10], [6, 8, 10], [6, 8, 4]],
    [[0, 2, 4], [0, 8, 4], [6, 8, 4], [6, 2, 4]],
    [[0, 2, 10], [6, 2, 10], [6, 8, 10], [0, 8, 10]]
  ]

  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 216)
  t.is(measureVolume(obs), 216)
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))

  // test size
  obs = cuboid({ size: [4.5, 1.5, 7] })
  pts = geom3.toVertices(obs)
  exp = [
    [[-2.25, -0.75, -3.5], [-2.25, -0.75, 3.5], [-2.25, 0.75, 3.5], [-2.25, 0.75, -3.5]],
    [[2.25, -0.75, -3.5], [2.25, 0.75, -3.5], [2.25, 0.75, 3.5], [2.25, -0.75, 3.5]],
    [[-2.25, -0.75, -3.5], [2.25, -0.75, -3.5], [2.25, -0.75, 3.5], [-2.25, -0.75, 3.5]],
    [[-2.25, 0.75, -3.5], [-2.25, 0.75, 3.5], [2.25, 0.75, 3.5], [2.25, 0.75, -3.5]],
    [[-2.25, -0.75, -3.5], [-2.25, 0.75, -3.5], [2.25, 0.75, -3.5], [2.25, -0.75, -3.5]],
    [[-2.25, -0.75, 3.5], [2.25, -0.75, 3.5], [2.25, 0.75, 3.5], [-2.25, 0.75, 3.5]]
  ]

  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 97.5)
  t.is(measureVolume(obs), 47.25)
  t.is(pts.length, 6)
  t.true(comparePolygonsAsPoints(pts, exp))
})

test('cuboid (zero size)', (t) => {
  const obs = cuboid({ size: [1, 1, 0] })
  const pts = geom3.toVertices(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 0)
  t.is(measureVolume(obs), 0)
  t.is(pts.length, 0)
})
