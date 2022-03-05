const test = require('ava')
const { divide, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: divide() called with three parameters should update a vec3 with correct values', (t) => {
  const obs1 = fromValues(0, 0, 0)
  const ret1 = divide(obs1, [0, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [0 / 0, 0 / 0, 0 / 0]))
  t.true(compareVectors(ret1, [0 / 0, 0 / 0, 0 / 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = divide(obs2, [0, 0, 0], [1, 2, 3])
  t.true(compareVectors(obs2, [0, 0, 0]))
  t.true(compareVectors(ret2, [0, 0, 0]))

  const obs3 = fromValues(0, 0, 0)
  const ret3 = divide(obs3, [6, 6, 6], [1, 2, 3])
  t.true(compareVectors(obs3, [6, 3, 2]))
  t.true(compareVectors(ret3, [6, 3, 2]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = divide(obs4, [-6, -6, -6], [1, 2, 3])
  t.true(compareVectors(obs4, [-6, -3, -2]))
  t.true(compareVectors(ret4, [-6, -3, -2]))

  const obs5 = fromValues(0, 0, 0)
  const ret5 = divide(obs5, [6, 6, 6], [-1, -2, -3])
  t.true(compareVectors(obs5, [-6, -3, -2]))
  t.true(compareVectors(ret5, [-6, -3, -2]))

  const obs6 = fromValues(0, 0, 0)
  const ret6 = divide(obs6, [-6, -6, -6], [-1, -2, -3])
  t.true(compareVectors(obs6, [6, 3, 2]))
  t.true(compareVectors(ret6, [6, 3, 2]))
})
