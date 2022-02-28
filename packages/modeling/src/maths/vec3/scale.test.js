const test = require('ava')
const { scale, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: scale() called with three parameters should update a vec3 with correct values', (t) => {
  const obs1 = fromValues(0, 0, 0)
  const ret1 = scale(obs1, [0, 0, 0], 0)
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = scale(obs2, [1, 2, 3], 0)
  t.true(compareVectors(obs2, [0, 0, 0]))
  t.true(compareVectors(ret2, [0, 0, 0]))

  const obs3 = fromValues(0, 0, 0)
  const ret3 = scale(obs3, [1, 2, 3], 6)
  t.true(compareVectors(obs3, [6, 12, 18]))
  t.true(compareVectors(ret3, [6, 12, 18]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = scale(obs4, [1, 2, 3], -6)
  t.true(compareVectors(obs4, [-6, -12, -18]))
  t.true(compareVectors(ret4, [-6, -12, -18]))

  const obs5 = fromValues(0, 0, 0)
  const ret5 = scale(obs5, [-1, -2, -3], 6)
  t.true(compareVectors(obs5, [-6, -12, -18]))
  t.true(compareVectors(ret5, [-6, -12, -18]))

  const obs6 = fromValues(0, 0, 0)
  const ret6 = scale(obs6, [-1, -2, -3], -6)
  t.true(compareVectors(obs6, [6, 12, 18]))
  t.true(compareVectors(ret6, [6, 12, 18]))
})
