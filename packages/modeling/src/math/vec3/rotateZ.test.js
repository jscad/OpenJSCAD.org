const test = require('ava')
const { rotateZ, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: rotateZ() called with two paramerters should return a vec3 with correct values', (t) => {
  const radians = 90 * Math.PI / 180

  const obs1 = rotateZ(0, [0, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))

  const obs2 = rotateZ(0, [1, 2, 3], [3, 2, 1])
  t.true(compareVectors(obs2, [3, 2, 1]))

  // const obs3 = rotateZ(radians, [1, 2, 3], [-1, -2, -3])
  // FIXME t.true(compareVectors(obs3, [5, -0, -3]))

  const obs4 = rotateZ(-radians, [-1, -2, -3], [1, 2, 3])
  t.true(compareVectors(obs4, [3, -4, 3]))
})

test('vec3: rotateZ() called with three paramerters should update a vec3 with correct values', (t) => {
  const radians = 90 * Math.PI / 180

  const obs1 = fromValues(0, 0, 0)
  const ret1 = rotateZ(obs1, 0, [0, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = rotateZ(obs2, 0, [1, 2, 3], [3, 2, 1])
  t.true(compareVectors(obs2, [3, 2, 1]))
  t.true(compareVectors(ret2, [3, 2, 1]))

  // const obs3 = fromValues(0, 0, 0)
  // const ret3 = rotateZ(obs3, radians, [1, 2, 3], [-1, -2, -3])
  // FIXME t.true(compareVectors(obs3, [5, -0, -3]))
  // FIXME t.true(compareVectors(ret3, [5, -0, -3]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = rotateZ(obs4, -radians, [-1, -2, -3], [1, 2, 3])
  t.true(compareVectors(obs4, [3, -4, 3]))
  t.true(compareVectors(ret4, [3, -4, 3]))
})
