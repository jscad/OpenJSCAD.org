const test = require('ava')
const { rotateY, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: rotateY() called with two paramerters should return a vec3 with correct values', (t) => {
  const radians = 90 * Math.PI / 180

  const obs1 = rotateY(0, [0, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))

  const obs2 = rotateY(0, [1, 2, 3], [3, 2, 1])
  t.true(compareVectors(obs2, [3, 2, 1]))

  const obs3 = rotateY(radians, [1, 2, 3], [-1, -2, -3])
  t.true(compareVectors(obs3, [-5, -2, 5]))

  const obs4 = rotateY(-radians, [-1, -2, -3], [1, 2, 3])
  t.true(compareVectors(obs4, [-7, 2, -1], 1e-15))
})

test('vec3: rotateY() called with three paramerters should update a vec3 with correct values', (t) => {
  const radians = 90 * Math.PI / 180

  const obs1 = fromValues(0, 0, 0)
  const ret1 = rotateY(obs1, 0, [0, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = rotateY(obs2, 0, [1, 2, 3], [3, 2, 1])
  t.true(compareVectors(obs2, [3, 2, 1]))
  t.true(compareVectors(ret2, [3, 2, 1]))

  const obs3 = fromValues(0, 0, 0)
  const ret3 = rotateY(obs3, radians, [1, 2, 3], [-1, -2, -3])
  t.true(compareVectors(obs3, [-5, -2, 5]))
  t.true(compareVectors(ret3, [-5, -2, 5]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = rotateY(obs4, -radians, [-1, -2, -3], [1, 2, 3])
  t.true(compareVectors(obs4, [-7, 2, -1], 1e-15))
  t.true(compareVectors(ret4, [-7, 2, -1], 1e-15))
})
