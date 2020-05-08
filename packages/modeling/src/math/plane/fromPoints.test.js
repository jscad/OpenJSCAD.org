const test = require('ava')
const { fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('plane: fromPoints() should return a new plane with correct values', (t) => {
  const obs1 = fromPoints([0, 0, 0], [1, 0, 0], [1, 1, 0])
  t.true(compareVectors(obs1, [0, 0, 1, 0]))

  const obs2 = fromPoints([0, 6, 0], [0, 2, 2], [0, 6, 6])
  t.true(compareVectors(obs2, [-1, 0, 0, 0]))

  // planes created from the same points results in an invalid plane
  const obs3 = fromPoints([0, 6, 0], [0, 6, 0], [0, 6, 0])
  t.true(compareVectors(obs3, [0 / 0, 0 / 0, 0 / 0, 0 / 0]))
})
