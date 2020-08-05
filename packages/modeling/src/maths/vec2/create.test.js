const test = require('ava')

const { create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('vec2: create() should return a vec2 with initial values', (t) => {
  const obs = create()
  t.true(compareVectors(obs, [0, 0]))
})
