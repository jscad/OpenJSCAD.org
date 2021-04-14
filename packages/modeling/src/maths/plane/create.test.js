const test = require('ava')

const { create } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('plane: create() should return a plane with initial values', (t) => {
  const obs = create()
  t.true(compareVectors(obs, [0, 0, 0, 0]))
})
