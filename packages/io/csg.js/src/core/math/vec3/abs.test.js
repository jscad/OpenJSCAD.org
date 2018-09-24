const test = require('ava')
const { abs } = require('./index')

const { compareVectors } = require('../../../../test/helpers/index')

test('vec3: abs() should return a vec3 with positive values', (t) => {
  const obs1 = abs([0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))

  const obs2 = abs([1, 2, 3])
  t.true(compareVectors(obs2, [1, 2, 3]))

  const obs3 = abs([-1, -2, -3])
  t.true(compareVectors(obs3, [1, 2, 3]))
})
