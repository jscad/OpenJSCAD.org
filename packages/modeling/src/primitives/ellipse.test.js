const test = require('ava')

const { ellipse } = require('./index')

const geom2 = require('../geometry/geom2')

const comparePoints = require('../../test/helpers/comparePoints')

test('ellipse (defaults)', t => {
  const geometry = ellipse()
  const obs = geom2.toPoints(geometry)

  t.deepEqual(obs.length, 32)
})

test('ellipse (options)', t => {
  // test radius
  let geometry = ellipse({ radius: [3, 5], segments: 16 })
  let obs = geom2.toPoints(geometry)
  const exp = [
    [3, 0],
    [2.7716386318206787, 1.9134172201156616],
    [2.1213202476501465, 3.535533905029297],
    [1.148050308227539, 4.6193976402282715],
    [1.8369701465288538e-16, 5],
    [-1.148050308227539, 4.6193976402282715],
    [-2.1213202476501465, 3.535533905029297],
    [-2.7716386318206787, 1.9134172201156616],
    [-3, 6.123233998228043e-16],
    [-2.7716386318206787, -1.9134172201156616],
    [-2.1213202476501465, -3.535533905029297],
    [-1.148050308227539, -4.6193976402282715],
    [-5.510910704284357e-16, -5],
    [1.148050308227539, -4.6193976402282715],
    [2.1213202476501465, -3.535533905029297],
    [2.7716386318206787, -1.9134172201156616]
  ]

  t.deepEqual(obs.length, 16)
  t.true(comparePoints(obs, exp))

  // test segments
  geometry = ellipse({ segments: 72 })
  obs = geom2.toPoints(geometry)
  t.deepEqual(obs.length, 72)
})
