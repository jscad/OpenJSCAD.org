const test = require('ava')

const plane = require('../plane')

const { mirrorByPlane, create } = require('./index')

const { compareVectors } = require('../../../test/helpers')

test('mat4: mirrorByPlane() called with out parameter should return a new mat4 with correct values', (t) => {
  const planeX = plane.fromPoints(plane.create(), [0, 0, 0], [0, 1, 1], [0, 1, 0])
  const planeY = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 0, 1])
  const planeZ = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 1, 0])

  const out1 = create()
  const ret1 = mirrorByPlane(out1, planeX)
  t.true(compareVectors(out1, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret1, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const out2 = create()
  const ret2 = mirrorByPlane(out2, planeY)
  t.true(compareVectors(out2, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret2, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const out3 = create()
  const ret3 = mirrorByPlane(out3, planeZ)
  t.true(compareVectors(out3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))
})
