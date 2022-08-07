const test = require('ava')

const { TAU } = require('../constants')

const { rotateZ, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: rotateZ() called with four parameters should update a vec3 with correct values', (t) => {
  const radians = TAU / 4

  const obs1 = fromValues(0, 0, 0)
  const ret1 = rotateZ(obs1, [0, 0, 0], [0, 0, 0], 0)
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = rotateZ(obs2, [3, 2, 1], [1, 2, 3], 0)
  t.true(compareVectors(obs2, [3, 2, 1]))
  t.true(compareVectors(ret2, [3, 2, 1]))

  const obs3 = fromValues(0, 0, 0)
  const ret3 = rotateZ(obs3, [-1, -2, -3], [1, 2, 3], radians)
  t.true(compareVectors(obs3, [5, -0, -3]))
  t.true(compareVectors(ret3, [5, -0, -3]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = rotateZ(obs4, [1, 2, 3], [-1, -2, -3], -radians)
  t.true(compareVectors(obs4, [3, -4, 3]))
  t.true(compareVectors(ret4, [3, -4, 3]))
})
