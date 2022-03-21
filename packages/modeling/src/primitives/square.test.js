const test = require('ava')

const { square } = require('./index')

const geom2 = require('../geometries/geom2')

const comparePoints = require('../../test/helpers/comparePoints')

test('square (defaults)', (t) => {
  const geometry = square()
  const obs = geom2.toPoints(geometry)
  t.true(geom2.isA(geometry))
  t.deepEqual(obs.length, 4)
})

test('square (options)', (t) => {
  // test center
  let obs = square({ size: 7, center: [6.5, 6.5] })
  let pts = geom2.toPoints(obs)
  let exp = [
    [3, 3],
    [10, 3],
    [10, 10],
    [3, 10]
  ]

  t.true(geom2.isA(obs))
  t.is(pts.length, 4)
  t.true(comparePoints(pts, exp))

  // test size
  obs = square({ size: 7 })
  pts = geom2.toPoints(obs)
  exp = [
    [-3.5, -3.5],
    [3.5, -3.5],
    [3.5, 3.5],
    [-3.5, 3.5]
  ]

  t.true(geom2.isA(obs))
  t.is(pts.length, 4)
  t.true(comparePoints(pts, exp))
})
