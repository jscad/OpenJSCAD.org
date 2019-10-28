const test = require('ava')
const { create } = require('./index')

test('poly3: create() should return a poly3 with initial values', (t) => {
  const obs = create()
  const exp = { vertices: [], plane: Float32Array.from([0, 0, 0, 0]) }
  t.deepEqual(obs, exp)
})
