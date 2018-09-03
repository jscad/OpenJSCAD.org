const test = require('ava')
const {equals, fromValues} = require('./index')

test('plane: equals() should return correct booleans', t => {
  const plane_a1 = fromValues(0, 0, 0, 0)
  const plane_b1 = fromValues(0, 0, 0, 0)
  t.true(equals(plane_a1, plane_b1))

  const plane_b2 = fromValues(1, 1, 1, 1)
  t.false(equals(plane_a1, plane_b2))

  const plane_b3 = fromValues(0, 1, 1, 0)
  t.false(equals(plane_a1, plane_b3))

  const plane_b4 = fromValues(0, 0, 1, 1)
  t.false(equals(plane_a1, plane_b3))
})
