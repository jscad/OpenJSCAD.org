const test = require('ava')

const {square} = require('./index')

const geom2 = require('../geometry/geom2')

const comparePoints = require('../../test/helpers/comparePoints')

test('square (defaults)', t => {
  const geometry = square()
  const obs = geom2.toPoints(geometry)
  t.deepEqual(obs.length, 4)
})

test('square (options)', t => {
  // test size
  let obs = square({size: 7})
  let pts = geom2.toPoints(obs)
  let exp = [
    [ -3.5, -3.5 ],
    [ 3.5, -3.5 ],
    [ 3.5, 3.5 ],
    [ -3.5, 3.5 ]
  ]

  t.is(pts.length, 4)
  t.true(comparePoints(pts, exp))
})
