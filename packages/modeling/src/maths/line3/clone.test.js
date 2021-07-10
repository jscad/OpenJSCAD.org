const test = require('ava')
const { create, clone, fromPointAndDirection } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: clone() should return a new line3 with same values', (t) => {
  const org1 = fromPointAndDirection(create(), [0, 0, 0], [1, 0, 0])
  const obs1 = clone(org1)
  t.true(compareVectors(obs1[0], [0, 0, 0]))
  t.true(compareVectors(obs1[1], [1, 0, 0]))
  t.not(obs1, org1)

  const org2 = fromPointAndDirection(create(), [1, 2, 3], [1, 0, 1])
  const obs2 = clone(org2)
  t.true(compareVectors(obs2[0], [1, 2, 3]))
  t.true(compareVectors(obs2[1], [0.7071067811865475, 0, 0.7071067811865475]))
  t.not(obs2, org2)

  const org3 = fromPointAndDirection(create(), [-1, -2, -3], [0, -1, -1])
  const obs3 = clone(org3)
  t.true(compareVectors(obs3[0], [-1, -2, -3]))
  t.true(compareVectors(obs3[1], [0, -0.7071067811865475, -0.7071067811865475]))
  t.not(obs3, org3)
})
