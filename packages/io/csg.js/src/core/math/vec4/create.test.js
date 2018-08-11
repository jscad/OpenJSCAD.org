const test = require('ava')
const {create} = require('./index')

test('vec4: create() should return a vec4 with initial values', t => {
  const obs = create()
  const exp = Float32Array.from([0,0,0,0])
  t.deepEqual(obs, exp)
})
