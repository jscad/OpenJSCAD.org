const test = require('ava')

const { dot, fromValues } = require('./index')

test('vec4: dot() should return proper values', (t) => {
  const vecA = fromValues(1, 2, 3, 4)
  const vecB = fromValues(5, 6, 7, 8)

  const obs = dot(vecA, vecB)
  t.is(obs, 70)
})
