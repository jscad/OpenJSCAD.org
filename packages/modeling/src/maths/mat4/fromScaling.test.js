const test = require('ava')
const { fromScaling } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromScaling() should return a new mat4 with correct values', (t) => {
  const obs1 = fromScaling([2, 4, 6])
  t.true(compareVectors(obs1, [2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1]))

  const obs2 = fromScaling([-2, -4, -6])
  t.true(compareVectors(obs2, [-2, 0, 0, 0, 0, -4, 0, 0, 0, 0, -6, 0, 0, 0, 0, 1]))
})

test('mat4: fromScaling() called with out parameter should return a new mat4 with correct values', (t) => {
  const obs3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret3 = fromScaling(obs3, [2, 4, 6])
  t.true(compareVectors(obs3, [2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret3, [2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1]))

  const obs4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret4 = fromScaling(obs4, [-2, -4, -6])
  t.true(compareVectors(obs4, [-2, 0, 0, 0, 0, -4, 0, 0, 0, 0, -6, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret4, [-2, 0, 0, 0, 0, -4, 0, 0, 0, 0, -6, 0, 0, 0, 0, 1]))
})
