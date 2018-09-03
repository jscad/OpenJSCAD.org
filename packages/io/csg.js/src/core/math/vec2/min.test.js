const test = require('ava')
const {min, fromValues} = require('./index')

const {compareVectors} = require('../../../../test/helpers/index')

test('vec2: min() called with two parameters should return a vec2 with correct values', t => {
  const vec_a1 = fromValues(0, 0)
  const vec_b1 = fromValues(0, 0)
  const obs1 = min(vec_a1, vec_b1)
  t.true(compareVectors(obs1, [0, 0]))

  const vec_b2 = fromValues(1, 1)
  const obs2 = min(vec_a1, vec_b2)
  t.true(compareVectors(obs2, [0, 0]))

  const vec_b3 = fromValues(0, 1)
  const obs3 = min(vec_a1, vec_b3)
  t.true(compareVectors(obs3, [0, 0]))

  const vec_b4 = fromValues(0, 0)
  const obs4 = min(vec_a1, vec_b4)
  t.true(compareVectors(obs4, [0, 0]))
})

test('vec2: min() called with three parameters should update a vec2 with correct values', t => {
  let obs1 = fromValues(0, 0)
  const vec_a1 = fromValues(0, 0)
  const vec_b1 = fromValues(0, 0)
  const ret1 = min(obs1, vec_a1, vec_b1)
  t.true(compareVectors(obs1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))

  let obs2 = fromValues(0, 0)
  const vec_b2 = fromValues(1, 1)
  const ret2 = min(obs2, vec_a1, vec_b2)
  t.true(compareVectors(obs2, [0, 0]))
  t.true(compareVectors(ret2, [0, 0]))

  let obs3 = fromValues(0, 0)
  const vec_b3 = fromValues(0, 1)
  const ret3 = min(obs3, vec_a1, vec_b3)
  t.true(compareVectors(obs3, [0, 0]))
  t.true(compareVectors(ret3, [0, 0]))

  let obs4 = fromValues(0, 0)
  const vec_b4 = fromValues(0, 0)
  const ret4 = min(obs4, vec_a1, vec_b4)
  t.true(compareVectors(obs4, [0, 0]))
  t.true(compareVectors(ret4, [0, 0]))
})
