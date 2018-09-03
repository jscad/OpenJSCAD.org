const test = require('ava')
const {flip} = require('./index')

const {compareVectors} = require('../../../../test/helpers/index')

test('plane: flip() called with one paramerters should return a plane with correct values', t => {
  const obs1 = flip([0, 0, 0, 0])
  t.true(compareVectors(obs1, [-0, -0, -0, -0]))

  const obs2 = flip([1, 2, 3, 4])
  t.true(compareVectors(obs2, [-1, -2, -3, -4]))

  const obs3 = flip([-1, -2, -3, -4])
  t.true(compareVectors(obs3, [1, 2, 3, 4]))

  const obs4 = flip([-1, 2, -3, 4])
  t.true(compareVectors(obs4, [1, -2, 3, -4]))
})
