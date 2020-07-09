const test = require('ava')
const { rotateZ, identity } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: rotateZ() should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  const idn = identity()

  const obs2 = rotateZ(rotation, idn)
  t.true(compareVectors(obs2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs3 = rotateZ(-rotation, idn)
  t.true(compareVectors(obs3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})

test('mat4: rotateZ() called with out parameter should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  const idn = identity()

  const out2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret2 = rotateZ(out2, rotation, idn)
  t.true(compareVectors(out2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.is(out2, ret2)

  const out3 = identity()
  const ret3 = rotateZ(out3, -rotation, out3)
  t.true(compareVectors(out3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})
