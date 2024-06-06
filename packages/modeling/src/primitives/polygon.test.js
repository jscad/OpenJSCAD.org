import test from 'ava'

import { geom2 } from '../geometries/index.js'

import { measureArea } from '../measurements/index.js'

import { polygon } from './index.js'

import { comparePoints } from '../../test/helpers/index.js'

test('polygon: providing only object.points creates expected geometry', (t) => {
  let geometry = polygon({ points: [[0, 0], [100, 0], [130, 50], [30, 50]] })

  let obs = geom2.toPoints(geometry)
  let exp = [[0, 0], [100, 0], [130, 50], [30, 50]]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), 5000)
  t.true(comparePoints(obs, exp))

  geometry = polygon({ points: [[[0, 0], [100, 0], [0, 100]], [[10, 10], [80, 10], [10, 80]]] })

  obs = geom2.toPoints(geometry)
  exp = [[0, 0], [100, 0], [0, 100], [10, 10], [80, 10], [10, 80]]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), 7450)
  t.true(comparePoints(obs, exp))
})

test('polygon: providing object.points (array) and object.path (array) creates expected geometry', (t) => {
  let geometry = polygon({ points: [[0, 0], [100, 0], [130, 50], [30, 50]], paths: [[3, 2, 1, 0]] })

  let obs = geom2.toPoints(geometry)
  let exp = [[30, 50], [130, 50], [100, 0], [0, 0]]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), -5000)
  t.true(comparePoints(obs, exp))

  // multiple paths
  geometry = polygon({ points: [[0, 0], [100, 0], [0, 100], [10, 10], [80, 10], [10, 80]], paths: [[0, 1, 2], [3, 4, 5]] })

  obs = geom2.toPoints(geometry)
  exp = [[0, 0], [100, 0], [0, 100], [10, 10], [80, 10], [10, 80]]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), 7450)
  t.true(comparePoints(obs, exp))

  // multiple points and paths
  geometry = polygon({ points: [[[0, 0], [100, 0], [0, 100]], [[10, 10], [80, 10], [10, 80]]], paths: [[0, 1, 2], [3, 4, 5]] })

  obs = geom2.toPoints(geometry)
  exp = [[0, 0], [100, 0], [0, 100], [10, 10], [80, 10], [10, 80]]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), 7450)
  t.true(comparePoints(obs, exp))
})

test('polygon: clockwise points', (t) => {
  const poly = polygon({
    points: [[-10, -0], [-10, -10], [-15, -5]],
    orientation: 'clockwise'
  })
  t.is(measureArea(poly), 25)
})
