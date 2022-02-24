const test = require('ava')
const { negate, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: negate() called with two parameters should update a vec2 with correct values', (t) => {
  const obs1 = fromValues(0, 0)
  const ret1 = negate(obs1, [0, 0])
  t.true(compareVectors(obs1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))

  const obs2 = fromValues(0, 0)
  const ret2 = negate(obs2, [1, 2])
  t.true(compareVectors(obs2, [-1, -2]))
  t.true(compareVectors(ret2, [-1, -2]))

  const obs3 = fromValues(0, 0)
  const ret3 = negate(obs3, [-1, -2])
  t.true(compareVectors(obs3, [1, 2]))
  t.true(compareVectors(ret3, [1, 2]))

  const obs4 = fromValues(0, 0)
  const ret4 = negate(obs4, [-1, 2])
  t.true(compareVectors(obs4, [1, -2]))
  t.true(compareVectors(ret4, [1, -2]))
})
