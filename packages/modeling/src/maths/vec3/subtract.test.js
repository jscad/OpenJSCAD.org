const test = require('ava')
const { subtract, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: subtract() called with three parameters should update a vec3 with correct values', (t) => {
  const obs1 = fromValues(0, 0, 0)
  const ret1 = subtract(obs1, [0, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = subtract(obs2, [1, 2, 3], [3, 2, 1])
  t.true(compareVectors(obs2, [-2, 0, 2]))
  t.true(compareVectors(ret2, [-2, 0, 2]))

  const obs3 = fromValues(0, 0, 0)
  const ret3 = subtract(obs3, [1, 2, 3], [-1, -2, -3])
  t.true(compareVectors(obs3, [2, 4, 6]))
  t.true(compareVectors(ret3, [2, 4, 6]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = subtract(obs4, [-1, -2, -3], [-1, -2, -3])
  t.true(compareVectors(obs4, [0, 0, 0]))
  t.true(compareVectors(ret4, [0, 0, 0]))
})
