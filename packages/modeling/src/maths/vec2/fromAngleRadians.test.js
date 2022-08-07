const test = require('ava')

const { TAU } = require('../constants')

const { fromAngleRadians, create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: fromAngleRadians() should return a new vec2 with correct values', (t) => {
  const obs1 = fromAngleRadians(create(), 0)
  t.true(compareVectors(obs1, [1.0, 0.0]))

  const obs2 = fromAngleRadians(obs1, TAU / 2)
  t.true(compareVectors(obs2, [-1, 1.2246468525851679e-16]))
})
