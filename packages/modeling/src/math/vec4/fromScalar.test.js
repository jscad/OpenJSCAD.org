const test = require('ava')
const { fromScalar } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec4: fromScalar() should return a new vec4 with correct values', (t) => {
  const obs1 = fromScalar(0)
  t.true(compareVectors(obs1, [0, 0, 0, 0]))

  const obs2 = fromScalar(-5)
  t.true(compareVectors(obs2, [-5, -5, -5, -5]))
})
