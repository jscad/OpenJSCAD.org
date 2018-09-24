const test = require('ava')
const { normal } = require('./index')

const { compareVectors } = require('../../../../test/helpers/index')

test('vec2: normal() should return a vec2 with correct values', (t) => {
  const obs1 = normal([0, 0])
  t.true(compareVectors(obs1, [0, 0]))

  const obs2 = normal([1, 2])
  t.true(compareVectors(obs2, [-2, 1]))

  const obs3 = normal([-1, -2])
  t.true(compareVectors(obs3, [2, -1]))

  const obs4 = normal([-1, 2])
  t.true(compareVectors(obs4, [-2, -1]))
})
