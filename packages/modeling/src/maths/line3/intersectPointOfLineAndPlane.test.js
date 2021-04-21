const test = require('ava')

const plane = require('../plane/')

const { intersectPointOfLineAndPlane, fromPoints, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: intersectPointOfLineAndPlane() should return a new line3 with correct values', (t) => {
  const planeXY = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 1, 0]) // flat on XY
  const planeXZ = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [0, 0, 1]) // flat on XZ
  const planeYZ = plane.fromPoints(plane.create(), [0, 0, 0], [0, 1, 0], [0, 0, 1]) // flat on YZ

  const line1 = fromPoints(create(), [0, 0, 0], [1, 0, 0])
  // const line2 = fromPoints(create(), [1, 0, 0], [1, 1, 0])
  // const line3 = fromPoints(create(), [0, 6, 0], [0, 0, 6])

  let obs = intersectPointOfLineAndPlane(line1, planeXY) // no intersection, line on plane
  t.true(compareVectors(obs, [NaN, NaN, NaN]))

  obs = intersectPointOfLineAndPlane(line1, planeXY)
  t.true(compareVectors(obs, [0, 6, 0]))

  obs = intersectPointOfLineAndPlane(line1, planeXZ)
  t.true(compareVectors(obs, [0, 0, 6]))

  obs = intersectPointOfLineAndPlane(line1, planeYZ) // no intersection, line parallel to plane
  t.true(compareVectors(obs, [NaN, Infinity, NaN]))
})
