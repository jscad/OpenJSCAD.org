const test = require('ava')

const { create } = require('./index')

test('slice: create() should return a slice with initial values', (t) => {
  const obs = create()
  const exp = { edges: [] }
  t.deepEqual(obs, exp)
})
