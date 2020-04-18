const test = require('ava')
const { multiply, fromValues } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: multiply() called with two paramerters should return a vec2 with correct values', (t) => {
  const obs1 = multiply([0, 0], [0, 0])
  t.true(compareVectors(obs1, [0, 0]))

  const obs2 = multiply([0, 0], [1, 2])
  t.true(compareVectors(obs2, [0, 0]))

  const obs3 = multiply([6, 6], [1, 2])
  t.true(compareVectors(obs3, [6, 12]))

  const obs4 = multiply([-6, -6], [1, 2])
  t.true(compareVectors(obs4, [-6, -12]))

  const obs5 = multiply([6, 6], [-1, -2])
  t.true(compareVectors(obs5, [-6, -12]))

  const obs6 = multiply([-6, -6], [-1, -2])
  t.true(compareVectors(obs6, [6, 12]))
})

test('vec2: multiply() called with three paramerters should update a vec2 with correct values', (t) => {
  const obs1 = fromValues(0, 0)
  const ret1 = multiply(obs1, [0, 0], [0, 0])
  t.true(compareVectors(obs1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))

  const obs2 = fromValues(0, 0)
  const ret2 = multiply(obs2, [0, 0], [1, 2])
  t.true(compareVectors(obs2, [0, 0]))
  t.true(compareVectors(ret2, [0, 0]))

  const obs3 = fromValues(0, 0)
  const ret3 = multiply(obs3, [6, 6], [1, 2])
  t.true(compareVectors(obs3, [6, 12]))
  t.true(compareVectors(ret3, [6, 12]))

  const obs4 = fromValues(0, 0)
  const ret4 = multiply(obs4, [-6, -6], [1, 2])
  t.true(compareVectors(obs4, [-6, -12]))
  t.true(compareVectors(ret4, [-6, -12]))

  const obs5 = fromValues(0, 0)
  const ret5 = multiply(obs5, [6, 6], [-1, -2])
  t.true(compareVectors(obs5, [-6, -12]))
  t.true(compareVectors(ret5, [-6, -12]))

  const obs6 = fromValues(0, 0)
  const ret6 = multiply(obs6, [-6, -6], [-1, -2])
  t.true(compareVectors(obs6, [6, 12]))
  t.true(compareVectors(ret6, [6, 12]))
})
