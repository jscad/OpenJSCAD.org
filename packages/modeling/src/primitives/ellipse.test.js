const test = require('ava')

const { ellipse } = require('./index')

const geom2 = require('../geometries/geom2')

const comparePoints = require('../../test/helpers/comparePoints')

test('ellipse (defaults)', (t) => {
  const geometry = ellipse()
  const obs = geom2.toPoints(geometry)

  t.deepEqual(obs.length, 32)
})

test('ellipse (options)', (t) => {
  // test radius
  let geometry = ellipse({ radius: [3, 5], segments: 16 })
  let obs = geom2.toPoints(geometry)
  const exp = [
    [3, 0],
    [2.77163859753386, 1.913417161825449],
    [2.121320343559643, 3.5355339059327373],
    [1.1480502970952695, 4.619397662556434],
    [1.8369701987210297e-16, 5],
    [-1.1480502970952693, 4.619397662556434],
    [-2.1213203435596424, 3.5355339059327378],
    [-2.77163859753386, 1.9134171618254494],
    [-3, 6.123233995736766e-16],
    [-2.7716385975338604, -1.9134171618254483],
    [-2.121320343559643, -3.5355339059327373],
    [-1.148050297095271, -4.619397662556432],
    [-5.51091059616309e-16, -5],
    [1.14805029709527, -4.619397662556433],
    [2.121320343559642, -3.5355339059327386],
    [2.7716385975338595, -1.913417161825452]
  ]

  t.deepEqual(obs.length, 16)
  t.true(comparePoints(obs, exp))

  // test segments
  geometry = ellipse({ segments: 72 })
  obs = geom2.toPoints(geometry)
  t.deepEqual(obs.length, 72)
})
