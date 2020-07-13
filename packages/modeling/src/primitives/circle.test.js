const test = require('ava')

const { circle } = require('./index')

const geom2 = require('../geometries/geom2')

const comparePoints = require('../../test/helpers/comparePoints')

test('circle (defaults)', (t) => {
  const geometry = circle()
  const pts = geom2.toPoints(geometry)

  t.deepEqual(pts.length, 32)
})

test('circle (options)', (t) => {
  // test radius
  let geometry = circle({ radius: 3.5, segments: 16 })
  let pts = geom2.toPoints(geometry)
  let exp = [
    [3.5, 0],
    [3.2335784435272217, 1.339392066001892],
    [2.4748737812042236, 2.4748737812042236],
    [1.339392066001892, 3.2335784435272217],
    [0, 3.5],
    [-1.339392066001892, 3.2335784435272217],
    [-2.4748737812042236, 2.4748737812042236],
    [-3.2335784435272217, 1.339392066001892],
    [-3.5, 4.2862638516991895e-16],
    [-3.2335784435272217, -1.339392066001892],
    [-2.4748737812042236, -2.4748737812042236],
    [-1.339392066001892, -3.2335784435272217],
    [-6.429395645199886e-16, -3.5],
    [1.339392066001892, -3.2335784435272217],
    [2.4748737812042236, -2.4748737812042236],
    [3.2335784435272217, -1.339392066001892]
  ]

  t.deepEqual(pts.length, 16)
  t.true(comparePoints(pts, exp))

  // test segments
  geometry = circle({ radius: 3.5, segments: 5 })
  pts = geom2.toPoints(geometry)
  exp = [
    [3.5, 0],
    [1.0815595388412476, 3.328697919845581],
    [-2.831559419631958, 2.05724835395813],
    [-2.831559419631958, -2.05724835395813],
    [1.0815595388412476, -3.328697919845581]
  ]

  t.deepEqual(pts.length, 5)
  t.true(comparePoints(pts, exp))
})
