const test = require('ava')
const { clone, create, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: clone() should return a new vec2 with same values', (t) => {
  const org1 = fromValues(0, 0)
  const obs1 = clone(org1)
  t.true(compareVectors(obs1, [0, 0]))
  t.not(obs1, org1)

  const org2 = fromValues(1, 2)
  const obs2 = clone(org2)
  t.true(compareVectors(obs2, [1, 2]))
  t.not(obs2, org2)

  const org3 = fromValues(-1, -2)
  const obs3 = clone(org3)
  t.true(compareVectors(obs3, [-1, -2]))
  t.not(obs3, org3)
})

test('vec2: clone() with two params should update a vec2 with same values', (t) => {
  const out1 = create()
  const org1 = fromValues(0, 0)
  const ret1 = clone(out1, org1)
  t.true(compareVectors(out1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))
  t.not(ret1, org1)
  t.is(out1, ret1)

  const out2 = create()
  const org2 = fromValues(1, 2)
  const ret2 = clone(out2, org2)
  t.true(compareVectors(out2, [1, 2]))
  t.true(compareVectors(ret2, [1, 2]))
  t.not(ret2, org2)
  t.is(out2, ret2)

  const out3 = create()
  const org3 = fromValues(-1, -2)
  const ret3 = clone(out3, org3)
  t.true(compareVectors(out3, [-1, -2]))
  t.true(compareVectors(ret3, [-1, -2]))
  t.not(ret3, org3)
  t.is(out3, ret3)
})
