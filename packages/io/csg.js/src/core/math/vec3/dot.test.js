const test = require('ava')
const {dot, fromValues} = require('./index')

test('vec3: dot() should return correct values', t => {
  const vec_a1 = fromValues(0, 0, 0)
  const vec_b1 = fromValues(0, 0, 0)
  const dot1 = dot(vec_a1, vec_b1)
  t.true(dot1 === 0.0)

  const vec_a2 = fromValues(1, 1, 1)
  const vec_b2 = fromValues(-1, -1, -1)
  const dot2 = dot(vec_a2, vec_b2)
  t.true(dot2 === -3.0)

  const vec_a3 = fromValues(5, 5, 5)
  const vec_b3 = fromValues(5, 5, 5)
  const dot3 = dot(vec_a3, vec_b3)
  t.true(dot3 === 75.0)

  const vec_a4 = fromValues(5, 5, 5)
  const vec_b4 = fromValues(-2, 3, -4)
  const dot4 = dot(vec_a4, vec_b4)
  t.true(dot4 === -15.0)
})
