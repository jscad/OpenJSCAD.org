const test = require('ava')
const { fromTranslation } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromTranslation() should return a new mat4 with correct values', (t) => {
  const obs1 = fromTranslation([2, 4, 6])
  t.true(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 4, 6, 1]))

  const obs2 = fromTranslation([-2, -4, -6])
  t.true(compareVectors(obs2, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2, -4, -6, 1]))
})

test('mat4: fromTranslation() called with out parameter should return a new mat4 with correct values', (t) => {
  const obs3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret3 = fromTranslation(obs3, [2, 4, 6])
  t.true(compareVectors(obs3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 4, 6, 1]))
  t.true(compareVectors(ret3, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2, 4, 6, 1]))

  const obs4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret4 = fromTranslation(obs4, [-2, -4, -6])
  t.true(compareVectors(obs4, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2, -4, -6, 1]))
  t.true(compareVectors(ret4, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -2, -4, -6, 1]))
})
