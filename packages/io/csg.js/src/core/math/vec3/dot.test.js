const test = require('ava')
const { dot, fromValues } = require('./index')

test('vec3: dot() should return correct values', (t) => {
  const veca1 = fromValues(0, 0, 0)
  const vecb1 = fromValues(0, 0, 0)
  const dot1 = dot(veca1, vecb1)
  t.true(dot1 === 0.0)

  const veca2 = fromValues(1, 1, 1)
  const vecb2 = fromValues(-1, -1, -1)
  const dot2 = dot(veca2, vecb2)
  t.true(dot2 === -3.0)

  const veca3 = fromValues(5, 5, 5)
  const vecb3 = fromValues(5, 5, 5)
  const dot3 = dot(veca3, vecb3)
  t.true(dot3 === 75.0)

  const veca4 = fromValues(5, 5, 5)
  const vecb4 = fromValues(-2, 3, -4)
  const dot4 = dot(veca4, vecb4)
  t.true(dot4 === -15.0)
})
