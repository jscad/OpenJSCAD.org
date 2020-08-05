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
    [3.2335783637895035, 1.3393920132778143],
    [2.4748737341529163, 2.474873734152916],
    [1.3393920132778145, 3.2335783637895035],
    [2.143131898507868e-16, 3.5],
    [-1.339392013277814, 3.2335783637895035],
    [-2.474873734152916, 2.4748737341529163],
    [-3.2335783637895035, 1.3393920132778145],
    [-3.5, 4.286263797015736e-16],
    [-3.233578363789504, -1.3393920132778139],
    [-2.474873734152917, -2.474873734152916],
    [-1.339392013277816, -3.233578363789503],
    [-6.429395695523604e-16, -3.5],
    [1.339392013277815, -3.233578363789503],
    [2.474873734152916, -2.474873734152917],
    [3.233578363789503, -1.3393920132778163]
  ]

  t.deepEqual(pts.length, 16)
  t.true(comparePoints(pts, exp))

  // test segments
  geometry = circle({ radius: 3.5, segments: 5 })
  pts = geom2.toPoints(geometry)
  exp = [
    [3.5, 0],
    [1.081559480312316, 3.3286978070330373],
    [-2.8315594803123156, 2.0572483830236563],
    [-2.831559480312316, -2.0572483830236554],
    [1.0815594803123152, -3.3286978070330377]
  ]

  t.deepEqual(pts.length, 5)
  t.true(comparePoints(pts, exp))
})
