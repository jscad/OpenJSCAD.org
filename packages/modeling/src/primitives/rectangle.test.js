const test = require('ava')

const { rectangle } = require('./index')

const geom2 = require('../geometries/geom2')

const comparePoints = require('../../test/helpers/comparePoints')

test('rectangle (defaults)', (t) => {
  const geometry = rectangle()
  const obs = geom2.toPoints(geometry)
  const exp = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 4)
  t.true(comparePoints(obs, exp))
})

test('rectangle (options)', (t) => {
  // test center
  let geometry = rectangle({ center: [-4, -4] })
  let obs = geom2.toPoints(geometry)
  let exp = [
    [-5, -5],
    [-3, -5],
    [-3, -3],
    [-5, -3]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 4)
  t.true(comparePoints(obs, exp))

  // test size
  geometry = rectangle({ size: [6, 10] })
  obs = geom2.toPoints(geometry)
  exp = [
    [-3, -5],
    [3, -5],
    [3, 5],
    [-3, 5]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 4)
  t.true(comparePoints(obs, exp))
})

test('rectangle (zero size)', (t) => {
  const geometry = rectangle({ size: [1, 0] })
  const obs = geom2.toPoints(geometry)
  t.notThrows(() => geom2.validate(geometry))
  t.is(obs.length, 0)
})
