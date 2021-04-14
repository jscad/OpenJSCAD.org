const test = require('ava')
const { rotate, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: rotate() called with two paramerters should return a vec2 with correct values', (t) => {
  const radians = 90 * Math.PI / 180

  const obs1 = rotate(0, [0, 0])
  t.true(compareVectors(obs1, [0, 0]))

  const obs2 = rotate(0, [1, 2])
  t.true(compareVectors(obs2, [1, 2]))

  const obs3 = rotate(radians, [-1, -2])
  t.true(compareVectors(obs3, [2, -1], 1e-15))

  const obs4 = rotate(-radians, [-1, 2])
  t.true(compareVectors(obs4, [2, 1], 1e-15))
})

test('vec2: rotate() called with three paramerters should update a vec2 with correct values', (t) => {
  const radians = 90 * Math.PI / 180

  const obs1 = fromValues(0, 0)
  const ret1 = rotate(obs1, 0, [0, 0])
  t.true(compareVectors(obs1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))

  const obs2 = fromValues(0, 0)
  const ret2 = rotate(obs2, 0, [1, 2])
  t.true(compareVectors(obs2, [1, 2]))
  t.true(compareVectors(ret2, [1, 2]))

  const obs3 = fromValues(0, 0)
  const ret3 = rotate(obs3, radians, [-1, -2])
  t.true(compareVectors(obs3, [2, -1], 1e-15))
  t.true(compareVectors(ret3, [2, -1], 1e-15))

  const obs4 = fromValues(0, 0)
  const ret4 = rotate(obs4, -radians, [-1, 2])
  t.true(compareVectors(obs4, [2, 1], 1e-15))
  t.true(compareVectors(ret4, [2, 1], 1e-15))
})
