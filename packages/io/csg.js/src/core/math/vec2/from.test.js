const test = require('ava')
const { fromAngleDegrees, fromAngleRadians, fromScalar, toString } = require('./index')

const { compareVectors } = require('../../../../test/helpers/index')

test('vec2: fromScalar() should return a new vec2 with correct values', (t) => {
  const obs1 = fromScalar(0)
  t.true(compareVectors(obs1, [0, 0]))

  const obs2 = fromScalar(-5)
  t.true(compareVectors(obs2, [-5, -5]))

  const str = toString(obs2)
})

test('vec2: fromAngleRadians() should return a new vec2 with correct values', (t) => {
  const obs1 = fromAngleRadians(0)
  t.true(compareVectors(obs1, [1.0, 0.0]))

  const obs2 = fromAngleRadians(Math.PI)
  t.true(compareVectors(obs2, [-1, 1.2246468525851679e-16]))
})

test('vec2: fromAngleDegrees() should return a new vec2 with correct values', (t) => {
  const obs1 = fromAngleDegrees(0)
  t.true(compareVectors(obs1, [1.0, 0.0]))

  const obs2 = fromAngleDegrees(180)
  t.true(compareVectors(obs2, [-1, 1.2246468525851679e-16]))
})
