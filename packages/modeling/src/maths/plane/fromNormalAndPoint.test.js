const test = require('ava')
const { fromNormalAndPoint, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('plane: fromNormalAndPoint() should return a new plant with correct values', (t) => {
  const obs1 = fromNormalAndPoint(create(), [5, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [1, 0, 0, 0]))

  const obs2 = fromNormalAndPoint(obs1, [0, 0, 5], [5, 5, 5])
  t.true(compareVectors(obs2, [0, 0, 1, 5]))
})
