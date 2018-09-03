const test = require('ava')
const {max, fromValues} = require('./index')

const {compareVectors} = require('../../../../test/helpers/index')

test('vec3: max() called with two parameters should return a vec3 with correct values', t => {
  const vec_a1 = fromValues(0, 0, 0)
  const vec_b1 = fromValues(0, 0, 0)
  const obs1 = max(vec_a1, vec_b1)
  t.true(compareVectors(obs1, [0, 0, 0]))

  const vec_b2 = fromValues(1, 1, 1)
  const obs2 = max(vec_a1, vec_b2)
  t.true(compareVectors(obs2, [1, 1, 1]))

  const vec_b3 = fromValues(0, 1, 1)
  const obs3 = max(vec_a1, vec_b3)
  t.true(compareVectors(obs3, [0, 1, 1]))

  const vec_b4 = fromValues(0, 0, 1)
  const obs4 = max(vec_a1, vec_b4)
  t.true(compareVectors(obs4, [0, 0, 1]))
})

test('vec3: max() called with three parameters should update a vec3 with correct values', t => {
  let obs1 = fromValues(0, 0, 0)
  const vec_a1 = fromValues(0, 0, 0)
  const vec_b1 = fromValues(0, 0, 0)
  const ret1 = max(obs1, vec_a1, vec_b1)
  t.true(compareVectors(obs1, [0, 0, 0]))
  t.true(compareVectors(ret1, [0, 0, 0]))

  let obs2 = fromValues(0, 0, 0)
  const vec_b2 = fromValues(1, 1, 1)
  const ret2 = max(obs2, vec_a1, vec_b2)
  t.true(compareVectors(obs2, [1, 1, 1]))
  t.true(compareVectors(ret2, [1, 1, 1]))

  let obs3 = fromValues(0, 0, 0)
  const vec_b3 = fromValues(0, 1, 1)
  const ret3 = max(obs3, vec_a1, vec_b3)
  t.true(compareVectors(obs3, [0, 1, 1]))
  t.true(compareVectors(ret3, [0, 1, 1]))

  let obs4 = fromValues(0, 0, 0)
  const vec_b4 = fromValues(0, 0, 1)
  const ret4 = max(obs4, vec_a1, vec_b4)
  t.true(compareVectors(obs4, [0, 0, 1]))
  t.true(compareVectors(ret4, [0, 0, 1]))
})
