const test = require('ava')

const { TAU } = require('../constants')

const { rotateY, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: rotateY() called with three parameters should update a vec3 with correct values', (t) => {
  const radians = TAU / 4

  const obs1 = fromValues(0, 0, 0)
  const ret1 = rotateY(obs1, [0, 0, 0], [0, 0, 0], 0)
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = rotateY(obs2, [3, 2, 1], [1, 2, 3], 0)
  t.true(compareVectors(obs2, [3, 2, 1]))
  t.true(compareVectors(ret2, [3, 2, 1]))

  const obs3 = fromValues(0, 0, 0)
  const ret3 = rotateY(obs3, [-1, -2, -3], [1, 2, 3], radians)
  t.true(compareVectors(obs3, [-5, -2, 5]))
  t.true(compareVectors(ret3, [-5, -2, 5]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = rotateY(obs4, [1, 2, 3], [-1, -2, -3], -radians)
  t.true(compareVectors(obs4, [-7, 2, -1], 1e-15))
  t.true(compareVectors(ret4, [-7, 2, -1], 1e-15))
})
