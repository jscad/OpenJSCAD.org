const test = require('ava')
const { fromNormalAndPoint, fromVector3Ds, toString } = require('./index')

const { compareVectors } = require('../../../../test/helpers/index')

test('plane: fromNormalAndPoint() should return a new plant with correct values', (t) => {
  const obs1 = fromNormalAndPoint([5, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [1, 0, 0, 0]))

  const obs2 = fromNormalAndPoint([0, 0, 5], [5, 5, 5])
  t.true(compareVectors(obs2, [0, 0, 1, 5]))
})

test('plane: fromVector3Ds() should return a new plant with correct values', (t) => {
  const obs1 = fromVector3Ds([0, 0, 0], [1, 0, 0], [1, 1, 0])
  t.true(compareVectors(obs1, [0, 0, 1, 0]))

  const obs2 = fromVector3Ds([0, 6, 0], [0, 2, 2], [0, 6, 6])
  t.true(compareVectors(obs2, [-1, 0, 0, 0]))

  // planes created from the same points results in an invalid plane
  const obs3 = fromVector3Ds([0, 6, 0], [0, 6, 0], [0, 6, 0])
  t.true(compareVectors(obs3, [0 / 0, 0 / 0, 0 / 0, 0 / 0]))

  const str1 = toString(obs2)
})
