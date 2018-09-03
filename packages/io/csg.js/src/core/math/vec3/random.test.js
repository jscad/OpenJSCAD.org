const test = require('ava')
const {random, fromValues} = require('./index')

const {compareVectors} = require('../../../../test/helpers/index')

test('vec3: random() should return a vec3 with correct values', t => {
  const obs1 = random([0, 0, 0])
  t.true(compareVectors(obs1, [1, 0, 0]))

  const obs2 = random([3, 1, 3])
  t.true(compareVectors(obs2, [0, 1, 0]))

  const obs3 = random([3, 2, 1])
  t.true(compareVectors(obs3, [0, 0, 1]))
})
