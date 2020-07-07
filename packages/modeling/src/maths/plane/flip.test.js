const test = require('ava')
const { create, flip } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('plane: flip() called with one paramerters should return a plane with correct values', (t) => {
  const obs1 = flip([0, 0, 0, 0])
  t.true(compareVectors(obs1, [-0, -0, -0, -0]))

  const obs2 = flip([1, 2, 3, 4])
  t.true(compareVectors(obs2, [-1, -2, -3, -4]))

  const obs3 = flip([-1, -2, -3, -4])
  t.true(compareVectors(obs3, [1, 2, 3, 4]))

  const obs4 = flip([-1, 2, -3, 4])
  t.true(compareVectors(obs4, [1, -2, 3, -4]))
})

test('plane: flip() called with two paramerters should update a plane with correct values', (t) => {
  const org1 = create()
  const ret1 = flip(org1, [0, 0, 0, 0])
  t.true(compareVectors(org1, [-0, -0, -0, -0]))
  t.true(compareVectors(ret1, [-0, -0, -0, -0]))

  const org2 = create()
  const ret2 = flip(org2, [1, 2, 3, 4])
  t.true(compareVectors(org2, [-1, -2, -3, -4]))
  t.true(compareVectors(ret2, [-1, -2, -3, -4]))

  const org3 = create()
  const ret3 = flip(org3, [-1, -2, -3, -4])
  t.true(compareVectors(org3, [1, 2, 3, 4]))
  t.true(compareVectors(ret3, [1, 2, 3, 4]))

  const org4 = create()
  const ret4 = flip(org4, [-1, 2, -3, 4])
  t.true(compareVectors(org4, [1, -2, 3, -4]))
  t.true(compareVectors(ret4, [1, -2, 3, -4]))
})
