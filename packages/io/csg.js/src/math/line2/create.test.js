const test = require('ava')
const { create } = require('./index')

test('line2: create() should return a line2 with initial values', (t) => {
  const obs = create()
  const exp = Float32Array.from([0, 1, 0])
  t.deepEqual(obs, exp)
})
