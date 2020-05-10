const test = require('ava')
const { rotate, identity } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: rotate() should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  const idn = identity()

  // invalid condition when axis is 0,0,0
  const obs1 = rotate(rotation, [0, 0, 0], idn)
  t.true(obs1 === null)

  const obs2 = rotate(rotation, [0, 0, 1], idn)
  t.true(compareVectors(obs2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  const obs3 = rotate(-rotation, [0, 0, 1], idn)
  t.true(compareVectors(obs3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})

test('mat4: rotate() called with out parameter should return a new mat4 with correct values', (t) => {
  const rotation = 90 * 0.017453292519943295

  const idn = identity()

  // invalid condition when axis is 0,0,0
  const out1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret1 = rotate(out1, rotation, [0, 0, 0], idn)
  t.true(ret1 === null)
  t.true(compareVectors(out1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]))

  const out2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret2 = rotate(out2, rotation, [0, 0, 1], idn)
  t.true(compareVectors(out2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret2, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.is(out2, ret2)

  const out3 = identity()
  const ret3 = rotate(out3, -rotation, [0, 0, 1], out3)
  t.true(compareVectors(out3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret3, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})
