const test = require('ava')
const { lerp, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec3: lerp() called with two paramerters should return a vec3 with correct values', (t) => {
  const obs1 = lerp(0, [0, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))

  const obs2 = lerp(0.00, [1, 2, 3], [5, 6, 7])
  t.true(compareVectors(obs2, [1, 2, 3]))

  const obs3 = lerp(0.75, [1, 2, 3], [5, 6, 7])
  t.true(compareVectors(obs3, [4, 5, 6]))

  const obs4 = lerp(1.00, [1, 2, 3], [5, 6, 7])
  t.true(compareVectors(obs4, [5, 6, 7]))
})

test('vec3: lerp() called with three paramerters should update a vec3 with correct values', (t) => {
  const obs1 = fromValues(0, 0, 0)
  const ret1 = lerp(obs1, 0, [0, 0, 0], [0, 0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  const obs2 = fromValues(0, 0, 0)
  const ret2 = lerp(obs2, 0.00, [1, 2, 3], [5, 6, 7])
  t.true(compareVectors(obs2, [1, 2, 3]))
  t.true(compareVectors(ret2, [1, 2, 3]))

  const obs3 = fromValues(0, 0, 0)
  const ret3 = lerp(obs3, 0.75, [1, 2, 3], [5, 6, 7])
  t.true(compareVectors(obs3, [4, 5, 6]))
  t.true(compareVectors(ret3, [4, 5, 6]))

  const obs4 = fromValues(0, 0, 0)
  const ret4 = lerp(obs4, 1.00, [1, 2, 3], [5, 6, 7])
  t.true(compareVectors(obs4, [5, 6, 7]))
  t.true(compareVectors(ret4, [5, 6, 7]))
})
