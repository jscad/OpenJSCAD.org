const test = require('ava')
const { fromAngleDegrees, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: fromAngleDegrees() should return a new vec2 with correct values', (t) => {
  const obs1 = fromAngleDegrees(create(), 0)
  t.true(compareVectors(obs1, [1.0, 0.0]))

  const obs2 = fromAngleDegrees(obs1, 180)
  t.true(compareVectors(obs2, [-1, 1.2246468525851679e-16]))
})
