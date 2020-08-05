const test = require('ava')

const { create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: create() should return a line3 with initial values', (t) => {
  const obs = create()
  t.true(compareVectors(obs[0], [0, 0, 0]))
  t.true(compareVectors(obs[1], [0, 0, 1]))
})
