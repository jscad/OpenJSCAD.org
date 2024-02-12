const test = require('ava')
const { fromNoisyPoints, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('plane: fromNoisyPoints() should return a new plane with correct values', (t) => {
  const obs1 = fromNoisyPoints(create(), [0, 0, 0], [1, 0, 0], [1, 1, 0])
  t.true(compareVectors(obs1, [0, 0, 1, 0]))

  const obs2 = fromNoisyPoints(obs1, [0, 6, 0], [0, 2, 2], [0, 6, 6])
  t.true(compareVectors(obs2, [1, 0, 0, 0]))

  // same vertices results in an invalid plane
  const obs3 = fromNoisyPoints(obs1, [0, 6, 0], [0, 6, 0], [0, 6, 0])
  t.true(compareVectors(obs3, [0 / 0, 0 / 0, 0 / 0, 0 / 0]))

  // co-linear vertices
  const obs4 = fromNoisyPoints(obs1, [0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0])
  t.true(compareVectors(obs4, [0, 0, 1, 0]))

  // random vertices
  const obs5 = fromNoisyPoints(obs1, [0, 0, 0], [5, 1, -2], [3, -2, 4], [1, 1, 0])
  t.true(compareVectors(obs5, [0.08054818365229491, 0.8764542170444571, 0.47469990050062555, 0.4185833634679763]))
})
