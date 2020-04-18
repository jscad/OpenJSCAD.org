const test = require('ava')

const {rectangle} = require('./index')

const geom2 = require('../geometry/geom2')

const comparePoints = require('../../test/helpers/comparePoints')

test('rectangle (defaults)', t => {
  const geometry = rectangle()
  const obs = geom2.toPoints(geometry)
  const exp = [
    [-1, -1],
    [1, -1],
    [1, 1],
    [-1, 1]
  ]

  t.deepEqual(obs.length, 4)
  t.true(comparePoints(obs, exp))
})

test('rectangle (options)', t => {
  // test size
  const geometry = rectangle({size: [6, 10]})
  const obs = geom2.toPoints(geometry)
  const exp = [
    [ -3, -5 ],
    [ 3, -5 ],
    [ 3, 5 ],
    [ -3, 5 ]
  ]

  t.deepEqual(obs.length, 4)
  t.true(comparePoints(obs, exp))
})
