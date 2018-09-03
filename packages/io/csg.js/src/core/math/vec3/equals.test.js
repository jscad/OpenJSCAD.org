const test = require('ava')
const {equals, fromValues} = require('./index')

test('vec3: equals() should return correct booleans', t => {
  const vec_a1 = fromValues(0, 0, 0)
  const vec_b1 = fromValues(0, 0, 0)
  t.true(equals(vec_a1, vec_b1))

  const vec_b2 = fromValues(1, 1, 1)
  t.false(equals(vec_a1, vec_b2))

  const vec_b3 = fromValues(0, 1, 1)
  t.false(equals(vec_a1, vec_b3))

  const vec_b4 = fromValues(0, 0, 1)
  t.false(equals(vec_a1, vec_b3))
})
