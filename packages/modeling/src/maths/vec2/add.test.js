const test = require('ava')
const { add, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: add() called with three parameters should update a vec2 with correct values', (t) => {
  const obs1 = fromValues(0, 0)
  const ret1 = add(obs1, [0, 0], [0, 0])
  t.true(compareVectors(obs1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))

  const obs2 = fromValues(0, 0)
  const ret2 = add(obs2, [1, 2], [3, 2])
  t.true(compareVectors(obs2, [4, 4]))
  t.true(compareVectors(ret2, [4, 4]))

  const obs3 = fromValues(0, 0)
  const ret3 = add(obs3, [1, 2], [-1, -2])
  t.true(compareVectors(obs3, [0, 0]))
  t.true(compareVectors(ret3, [0, 0]))

  const obs4 = fromValues(0, 0)
  const ret4 = add(obs4, [-1, -2], [-1, -2])
  t.true(compareVectors(obs4, [-2, -4]))
  t.true(compareVectors(ret4, [-2, -4]))
})
