import test from 'ava'

import { comparePoints, comparePolygonsAsPoints } from '../../../test/helpers'

import { geom2, geom3, path2 } from '../../geometries'

import { Vec3 } from '../../maths/vec3'

import { translate, translateX, translateY, translateZ } from './index'

test('translate: translating of a path2 produces expected changes to points [TS]', (t) => {
  const line = path2.fromPoints({}, [[0, 0], [1, 0]])

  // translate X
  let translated = translate([1], line)
  let obs = path2.toPoints(translated)
  let exp = [[1, 0], [2, 0]]
  t.true(comparePoints(obs, exp))

  translated = translateX(1, line)
  obs = path2.toPoints(translated)
  t.true(comparePoints(obs, exp))

  // translate Y
  translated = translate([0, 1], line)
  obs = path2.toPoints(translated)
  exp = [[0, 1], [1, 1]]
  t.true(comparePoints(obs, exp))

  translated = translateY(1, line)
  obs = path2.toPoints(translated)
  t.true(comparePoints(obs, exp))
})

test('translate: translating of a geom2 produces expected changes to points [TS]', (t) => {
  const geometry = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])

  // translate X
  let translated = translate([1], geometry)
  let obs = geom2.toPoints(translated)
  let exp = [[1, 0], [2, 0], [1, 1]]
  t.true(comparePoints(obs, exp))

  translated = translateX(1, geometry)
  obs = geom2.toPoints(translated)
  t.true(comparePoints(obs, exp))

  // translate Y
  translated = translate([0, 1], geometry)
  obs = geom2.toPoints(translated)
  exp = [[0, 1], [1, 1], [0, 2]]
  t.true(comparePoints(obs, exp))

  translated = translateY(1, geometry)
  obs = geom2.toPoints(translated)
  t.true(comparePoints(obs, exp))
})

test('translate: translating of a geom3 produces expected changes to polygons [TS]', (t) => {
  const points: Array<Array<Vec3>> = [
    [[-2, -7, -12], [-2, -7, 18], [-2, 13, 18], [-2, 13, -12]],
    [[8, -7, -12], [8, 13, -12], [8, 13, 18], [8, -7, 18]],
    [[-2, -7, -12], [8, -7, -12], [8, -7, 18], [-2, -7, 18]],
    [[-2, 13, -12], [-2, 13, 18], [8, 13, 18], [8, 13, -12]],
    [[-2, -7, -12], [-2, 13, -12], [8, 13, -12], [8, -7, -12]],
    [[-2, -7, 18], [8, -7, 18], [8, 13, 18], [-2, 13, 18]]
  ]
  const geometry = geom3.fromPoints(points)

  // translate X
  let translated = translate([3], geometry)
  let obs = geom3.toPoints(translated)
  let exp = [
    [[1, -7, -12], [1, -7, 18], [1, 13, 18], [1, 13, -12]],
    [[11, -7, -12], [11, 13, -12], [11, 13, 18], [11, -7, 18]],
    [[1, -7, -12], [11, -7, -12], [11, -7, 18], [1, -7, 18]],
    [[1, 13, -12], [1, 13, 18], [11, 13, 18], [11, 13, -12]],
    [[1, -7, -12], [1, 13, -12], [11, 13, -12], [11, -7, -12]],
    [[1, -7, 18], [11, -7, 18], [11, 13, 18], [1, 13, 18]]
  ]
  t.true(comparePolygonsAsPoints(obs, exp))

  translated = translateX(3, geometry)
  obs = geom3.toPoints(translated)
  t.true(comparePolygonsAsPoints(obs, exp))

  // translated Y
  translated = translate([0, 3], geometry)
  obs = geom3.toPoints(translated)
  exp = [
    [[-2, -4, -12], [-2, -4, 18], [-2, 16, 18], [-2, 16, -12]],
    [[8, -4, -12], [8, 16, -12], [8, 16, 18], [8, -4, 18]],
    [[-2, -4, -12], [8, -4, -12], [8, -4, 18], [-2, -4, 18]],
    [[-2, 16, -12], [-2, 16, 18], [8, 16, 18], [8, 16, -12]],
    [[-2, -4, -12], [-2, 16, -12], [8, 16, -12], [8, -4, -12]],
    [[-2, -4, 18], [8, -4, 18], [8, 16, 18], [-2, 16, 18]]
  ]
  t.true(comparePolygonsAsPoints(obs, exp))

  translated = translateY(3, geometry)
  obs = geom3.toPoints(translated)
  t.true(comparePolygonsAsPoints(obs, exp))

  // translate Z
  translated = translate([0, 0, 3], geometry)
  obs = geom3.toPoints(translated)
  exp = [
    [[-2, -7, -9], [-2, -7, 21], [-2, 13, 21], [-2, 13, -9]],
    [[8, -7, -9], [8, 13, -9], [8, 13, 21], [8, -7, 21]],
    [[-2, -7, -9], [8, -7, -9], [8, -7, 21], [-2, -7, 21]],
    [[-2, 13, -9], [-2, 13, 21], [8, 13, 21], [8, 13, -9]],
    [[-2, -7, -9], [-2, 13, -9], [8, 13, -9], [8, -7, -9]],
    [[-2, -7, 21], [8, -7, 21], [8, 13, 21], [-2, 13, 21]]
  ]
  t.true(comparePolygonsAsPoints(obs, exp))

  translated = translateZ(3, geometry)
  obs = geom3.toPoints(translated)
  t.true(comparePolygonsAsPoints(obs, exp))
})

test('translate: translating of multiple objects produces expected changes', (t) => {
  const geometry1 = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])
  const geometry2 = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  const translated = translate([3, 3, 3], geometry1, geometry2)

  let obs = path2.toPoints(translated[0])
  let exp = [[-2, 8], [8, 8], [-2, -2], [13, -2]]
  t.true(comparePoints(obs, exp))

  obs = geom2.toPoints(translated[1])
  exp = [[-2, -2], [3, 8], [13, -2]]
  t.true(comparePoints(obs, exp))
})
