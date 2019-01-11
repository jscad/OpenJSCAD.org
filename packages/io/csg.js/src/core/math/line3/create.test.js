const test = require('ava')
const { create } = require('./index')

test('line3: create() should return a line3 with initial values', (t) => {
  const obs = create()
  const point = Float32Array.from([0, 0, 0])
  const unit = Float32Array.from([0, 0, 1])
  t.deepEqual(obs[0], point)
  t.deepEqual(obs[1], unit)
})
