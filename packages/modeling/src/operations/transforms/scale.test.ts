import test from 'ava'

import { comparePoints, comparePolygonsAsPoints } from '../../../test/helpers'

import { geom2, geom3, path2 } from '../../geometries'

import { scale, scaleX, scaleY, scaleZ } from './index'

import Vec3 from '../../maths/vec3/type'

test('scale: scaling of a path2 produces expected changes to points', (t) => {
  const geometry = path2.fromPoints({}, [[0, 4], [1, 0]])

  // scale X
  let scaled = scale([3], geometry)
  let obs = path2.toPoints(scaled)
  let exp = [[0, 4], [3, 0]]
  t.true(comparePoints(obs, exp))

  scaled = scaleX(3, geometry)
  obs = path2.toPoints(scaled)
  t.true(comparePoints(obs, exp))

  // scale Y
  scaled = scale([1, 0.5], geometry)
  obs = path2.toPoints(scaled)
  exp = [[0, 2], [1, 0]]
  t.true(comparePoints(obs, exp))

  scaled = scaleY(0.5, geometry)
  obs = path2.toPoints(scaled)
  t.true(comparePoints(obs, exp))
})

test('scale: scaling of a geom2 produces expected changes to points', (t) => {
  const geometry = geom2.fromPoints([[-1, 0], [1, 0], [0, 1]])

  // scale X
  let scaled = scale([3], geometry)
  let obs = geom2.toPoints(scaled)
  let exp = [[-3, 0], [3, 0], [0, 1]]
  t.true(comparePoints(obs, exp))

  scaled = scaleX(3, geometry)
  obs = geom2.toPoints(scaled)
  t.true(comparePoints(obs, exp))

  // scale Y
  scaled = scale([1, 3], geometry)
  obs = geom2.toPoints(scaled)
  exp = [[-1, 0], [1, 0], [0, 3]]
  t.true(comparePoints(obs, exp))

  scaled = scaleY(3, geometry)
  obs = geom2.toPoints(scaled)
  t.true(comparePoints(obs, exp))
})

test('scale: scaling of a geom3 produces expected changes to polygons', (t) => {
  const points: Array<Array<Vec3>> = [
    [[-2, -7, -12], [-2, -7, 18], [-2, 13, 18], [-2, 13, -12]],
    [[8, -7, -12], [8, 13, -12], [8, 13, 18], [8, -7, 18]],
    [[-2, -7, -12], [8, -7, -12], [8, -7, 18], [-2, -7, 18]],
    [[-2, 13, -12], [-2, 13, 18], [8, 13, 18], [8, 13, -12]],
    [[-2, -7, -12], [-2, 13, -12], [8, 13, -12], [8, -7, -12]],
    [[-2, -7, 18], [8, -7, 18], [8, 13, 18], [-2, 13, 18]]
  ]
  const geometry = geom3.fromPoints(points)

  // scale X
  let scaled = scale([3], geometry)
  let obs = geom3.toPoints(scaled)
  let exp = [
    [[-6, -7, -12], [-6, -7, 18], [-6, 13, 18], [-6, 13, -12]],
    [[24, -7, -12], [24, 13, -12], [24, 13, 18], [24, -7, 18]],
    [[-6, -7, -12], [24, -7, -12], [24, -7, 18], [-6, -7, 18]],
    [[-6, 13, -12], [-6, 13, 18], [24, 13, 18], [24, 13, -12]],
    [[-6, -7, -12], [-6, 13, -12], [24, 13, -12], [24, -7, -12]],
    [[-6, -7, 18], [24, -7, 18], [24, 13, 18], [-6, 13, 18]]
  ]
  t.true(comparePolygonsAsPoints(obs, exp))

  scaled = scaleX(3, geometry)
  obs = geom3.toPoints(scaled)
  t.true(comparePolygonsAsPoints(obs, exp))

  // scale Y
  scaled = scale([1, 0.5], geometry)
  obs = geom3.toPoints(scaled)
  exp = [
    [[-2, -3.5, -12], [-2, -3.5, 18], [-2, 6.5, 18], [-2, 6.5, -12]],
    [[8, -3.5, -12], [8, 6.5, -12], [8, 6.5, 18], [8, -3.5, 18]],
    [[-2, -3.5, -12], [8, -3.5, -12], [8, -3.5, 18], [-2, -3.5, 18]],
    [[-2, 6.5, -12], [-2, 6.5, 18], [8, 6.5, 18], [8, 6.5, -12]],
    [[-2, -3.5, -12], [-2, 6.5, -12], [8, 6.5, -12], [8, -3.5, -12]],
    [[-2, -3.5, 18], [8, -3.5, 18], [8, 6.5, 18], [-2, 6.5, 18]]
  ]
  t.true(comparePolygonsAsPoints(obs, exp))

  scaled = scaleY(0.5, geometry)
  obs = geom3.toPoints(scaled)
  t.true(comparePolygonsAsPoints(obs, exp))

  // scale Z
  scaled = scale([1, 1, 5], geometry)
  obs = geom3.toPoints(scaled)
  exp = [
    [[-2, -7, -60], [-2, -7, 90], [-2, 13, 90], [-2, 13, -60]],
    [[8, -7, -60], [8, 13, -60], [8, 13, 90], [8, -7, 90]],
    [[-2, -7, -60], [8, -7, -60], [8, -7, 90], [-2, -7, 90]],
    [[-2, 13, -60], [-2, 13, 90], [8, 13, 90], [8, 13, -60]],
    [[-2, -7, -60], [-2, 13, -60], [8, 13, -60], [8, -7, -60]],
    [[-2, -7, 90], [8, -7, 90], [8, 13, 90], [-2, 13, 90]]
  ]
  t.true(comparePolygonsAsPoints(obs, exp))

  scaled = scaleZ(5, geometry)
  obs = geom3.toPoints(scaled)
  t.true(comparePolygonsAsPoints(obs, exp))
})

test('scale: scaling of multiple objects produces expected changes', (t) => {
  const geometry1 = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])
  const geometry2 = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  const scaled = scale([3, 1, 1], geometry1, geometry2)

  const obs1 = path2.toPoints(scaled[0])
  const exp1 = [[-15, 5], [15, 5], [-15, -5], [30, -5]]
  t.true(comparePoints(obs1, exp1))

  const obs2 = geom2.toPoints(scaled[1])
  const exp2 = [[-15, -5], [0, 5], [30, -5]]
  t.true(comparePoints(obs2, exp2))
})
