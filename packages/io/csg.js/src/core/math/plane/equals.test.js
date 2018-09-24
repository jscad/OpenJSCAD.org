const test = require('ava')
const { equals, fromValues } = require('./index')

test('plane: equals() should return correct booleans', (t) => {
  const plane0 = fromValues(0, 0, 0, 0)
  const plane1 = fromValues(0, 0, 0, 0)
  t.true(equals(plane0, plane1))

  const plane2 = fromValues(1, 1, 1, 1)
  t.false(equals(plane0, plane2))

  const plane3 = fromValues(0, 1, 1, 0)
  t.false(equals(plane0, plane3))

  const plane4 = fromValues(0, 0, 1, 1)
  t.false(equals(plane0, plane4))
})
