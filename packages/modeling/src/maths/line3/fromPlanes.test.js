const test = require('ava')

const plane = require('../plane/')

const { fromPlanes, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: fromPlanes() should return a new line3 with correct values', (t) => {
  const planeXY = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 1, 0]) // flat on XY
  const planeXZ = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [0, 0, 1]) // flat on XZ
  const planeYZ = plane.fromPoints(plane.create(), [0, 0, 0], [0, 1, 0], [0, 0, 1]) // flat on YZ
  const plane2 = plane.fromPoints(plane.create(), [0, -3, 0], [1, -3, 0], [0, -3, 1])

  let obs = fromPlanes(create(), planeXY, planeXZ)
  let pnt = obs[0]
  let dir = obs[1]
  t.true(compareVectors(pnt, [0, 0, 0]))
  t.true(compareVectors(dir, [1, 0, 0]))

  obs = fromPlanes(create(), planeYZ, planeXZ)
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [0, 0, 0]))
  t.true(compareVectors(dir, [0, 0, -1]))

  obs = fromPlanes(create(), planeXY, planeYZ)
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [0, 0, 0]))
  t.true(compareVectors(dir, [0, 1, 0]))

  obs = fromPlanes(obs, planeXY, plane2)
  pnt = obs[0]
  dir = obs[1]
  t.true(compareVectors(pnt, [0, -3, 0]))
  t.true(compareVectors(dir, [1, 0, 0]))
})
