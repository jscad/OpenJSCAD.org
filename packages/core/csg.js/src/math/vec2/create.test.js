const test = require('ava')
const { create } = require('./index')

test('vec2: create() should return a vec2 with initial values', (t) => {
  const obs = create()
  const exp = Float32Array.from([0, 0])
  t.deepEqual(obs, exp)
})
