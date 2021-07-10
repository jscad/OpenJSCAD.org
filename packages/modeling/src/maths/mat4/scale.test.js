const test = require('ava')
const { scale } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: scale() called with out parameter should return a new mat4 with correct values', (t) => {
  const obs1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret1 = scale(obs1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16], [1, 1, 1])
  t.true(compareVectors(obs1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))
  t.true(compareVectors(ret1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]))

  const obs2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret2 = scale(obs2, [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16], [2, 4, 6])
  t.true(compareVectors(obs2, [-2, -4, -6, -8, -20, -24, -28, -32, -54, -60, -66, -72, -13, -14, -15, -16]))
  t.true(compareVectors(ret2, [-2, -4, -6, -8, -20, -24, -28, -32, -54, -60, -66, -72, -13, -14, -15, -16]))

  const obs3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret3 = scale(obs3, [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10, -11, -12, -13, -14, -15, -16], [6, 4, 2])
  t.true(compareVectors(obs3, [-6, -12, -18, -24, -20, -24, -28, -32, -18, -20, -22, -24, -13, -14, -15, -16]))
  t.true(compareVectors(ret3, [-6, -12, -18, -24, -20, -24, -28, -32, -18, -20, -22, -24, -13, -14, -15, -16]))
})
