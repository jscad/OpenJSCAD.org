const test = require('ava')
const { fromScalar } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: fromScalar() should return a new vec2 with correct values', (t) => {
  const obs1 = fromScalar(0)
  t.true(compareVectors(obs1, [0, 0]))

  const obs2 = fromScalar(-5)
  t.true(compareVectors(obs2, [-5, -5]))
})
