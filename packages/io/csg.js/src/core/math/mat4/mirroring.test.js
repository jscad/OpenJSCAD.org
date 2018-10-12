const test = require('ava')
const { mirroring, create, toString } = require('./index')
const { fromVec3s } = require('../plane/index')

const { compareVectors } = require('../../../../test/helpers/index')

test('mat4: mirroring() should return a new mat4 with correct values', (t) => {
  const planeX = fromVec3s([0, 0, 0], [0, 1, 1], [0, 1, 0])
  const planeY = fromVec3s([0, 0, 0], [1, 0, 0], [1, 0, 1])
  const planeZ = fromVec3s([0, 0, 0], [1, 0, 0], [1, 1, 0])

  const obs1 = mirroring(planeX)
  t.true(compareVectors(obs1, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs2 = mirroring(planeY)
  t.true(compareVectors(obs2, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs3 = mirroring(planeZ)
  t.true(compareVectors(obs3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))
})

test('mat4: mirroring() called with out parameter should return a new mat4 with correct values', (t) => {
  const planeX = fromVec3s([0, 0, 0], [0, 1, 1], [0, 1, 0])
  const planeY = fromVec3s([0, 0, 0], [1, 0, 0], [1, 0, 1])
  const planeZ = fromVec3s([0, 0, 0], [1, 0, 0], [1, 1, 0])

  const out1 = create()
  const ret1 = mirroring(out1, planeX)
  t.true(compareVectors(out1, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret1, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const out2 = create()
  const ret2 = mirroring(out2, planeY)
  t.true(compareVectors(out2, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret2, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const out3 = create()
  const ret3 = mirroring(out3, planeZ)
  t.true(compareVectors(out3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))
})
