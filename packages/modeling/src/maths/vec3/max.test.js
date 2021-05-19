const test = require('ava')
const { max, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: max() called with three parameters should update a vec3 with correct values', (t) => {
  const obs1 = fromValues(0, 0, 0)
  const vec0 = fromValues(0, 0, 0)
  const vec1 = fromValues(0, 0, 0)
  const ret1 = max(obs1, vec0, vec1)
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const vec2 = fromValues(1, 1, 1)
  const ret2 = max(obs2, vec0, vec2)
  t.true(compareVectors(obs2, [1, 1, 1]))
  t.true(compareVectors(ret2, [1, 1, 1]))

  const obs3 = fromValues(0, 0, 0)
  const vec3 = fromValues(0, 1, 1)
  const ret3 = max(obs3, vec0, vec3)
  t.true(compareVectors(obs3, [0, 1, 1]))
  t.true(compareVectors(ret3, [0, 1, 1]))

  const obs4 = fromValues(0, 0, 0)
  const vec4 = fromValues(0, 0, 1)
  const ret4 = max(obs4, vec0, vec4)
  t.true(compareVectors(obs4, [0, 0, 1]))
  t.true(compareVectors(ret4, [0, 0, 1]))
})
