const test = require('ava')
const { fromScaling, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromScaling() should return a new mat4 with correct values', (t) => {
  const obs1 = fromScaling(create(), [2, 4, 6])
  t.true(compareVectors(obs1, [2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 6, 0, 0, 0, 0, 1]))

  const obs2 = fromScaling(obs1, [-2, -4, -6])
  t.true(compareVectors(obs2, [-2, 0, 0, 0, 0, -4, 0, 0, 0, 0, -6, 0, 0, 0, 0, 1]))
})
