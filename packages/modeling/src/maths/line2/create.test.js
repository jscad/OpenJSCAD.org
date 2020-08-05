const test = require('ava')

const { create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: create() should return a line2 with initial values', (t) => {
  const obs = create()
  t.true(compareVectors(obs, [0, 1, 0]))
})
