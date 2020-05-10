const test = require('ava')

const { fromPoints } = require('../plane')

const { mirrorByPlane, create } = require('./index')

const { compareVectors } = require('../../../test/helpers')

test('mat4: mirrorByPlane() should return a new mat4 with correct values', (t) => {
  const planeX = fromPoints([0, 0, 0], [0, 1, 1], [0, 1, 0])
  const planeY = fromPoints([0, 0, 0], [1, 0, 0], [1, 0, 1])
  const planeZ = fromPoints([0, 0, 0], [1, 0, 0], [1, 1, 0])

  const obs1 = mirrorByPlane(planeX)
  t.true(compareVectors(obs1, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs2 = mirrorByPlane(planeY)
  t.true(compareVectors(obs2, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs3 = mirrorByPlane(planeZ)
  t.true(compareVectors(obs3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))
})

test('mat4: mirrorByPlane() called with out parameter should return a new mat4 with correct values', (t) => {
  const planeX = fromPoints([0, 0, 0], [0, 1, 1], [0, 1, 0])
  const planeY = fromPoints([0, 0, 0], [1, 0, 0], [1, 0, 1])
  const planeZ = fromPoints([0, 0, 0], [1, 0, 0], [1, 1, 0])

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
