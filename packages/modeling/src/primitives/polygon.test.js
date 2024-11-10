const test = require('ava')

const geom2 = require('../geometries/geom2')
const measureArea = require('../measurements/measureArea')

const { polygon } = require('./index')

const comparePoints = require('../../test/helpers/comparePoints')

test('polygon: providing only object.points creates expected geometry', (t) => {
  let geometry = polygon({ points: [[0, 0], [100, 0], [130, 50], [30, 50]] })

  let obs = geom2.toPoints(geometry)
  let exp = [[0, 0], [100, 0], [130, 50], [30, 50]]

  t.notThrows(() => geom2.validate(geometry))
  t.true(comparePoints(obs, exp))

  geometry = polygon({ points: [[[0, 0], [100, 0], [0, 100]], [[10, 10], [80, 10], [10, 80]]] })

  obs = geom2.toPoints(geometry)
  exp = [[0, 0], [100, 0], [10, 80], [10, 10], [80, 10], [0, 100]]

  t.notThrows(() => geom2.validate(geometry))
  t.true(comparePoints(obs, exp))
})

test('polygon: providing object.points (array) and object.path (array) creates expected geometry', (t) => {
  let geometry = polygon({ points: [[0, 0], [100, 0], [130, 50], [30, 50]], paths: [[3, 2, 1, 0]] })

  let obs = geom2.toPoints(geometry)
  let exp = [[30, 50], [130, 50], [100, 0], [0, 0]]

  t.notThrows(() => geom2.validate(geometry))
  t.true(comparePoints(obs, exp))

  // multiple paths
  geometry = polygon({ points: [[0, 0], [100, 0], [0, 100], [10, 10], [80, 10], [10, 80]], paths: [[0, 1, 2], [3, 4, 5]] })

  obs = geom2.toPoints(geometry)
  exp = [[0, 0], [100, 0], [10, 80], [10, 10], [80, 10], [0, 100]]

  t.notThrows(() => geom2.validate(geometry))
  t.true(comparePoints(obs, exp))

  // multiple points and paths
  geometry = polygon({ points: [[[0, 0], [100, 0], [0, 100]], [[10, 10], [80, 10], [10, 80]]], paths: [[0, 1, 2], [3, 4, 5]] })

  obs = geom2.toPoints(geometry)
  exp = [[0, 0], [100, 0], [10, 80], [10, 10], [80, 10], [0, 100]]

  t.notThrows(() => geom2.validate(geometry))
  t.true(comparePoints(obs, exp))
})

test('polygon: clockwise points', (t) => {
  const poly = polygon({
    points: [[-10, -0], [-10, -10], [-15, -5]],
    orientation: 'clockwise'
  })
  t.is(poly.sides.length, 3)
  t.is(measureArea(poly), 25)
})
