const test = require('ava')

const { equals, fromPoints } = require('./index')

test('equals: checks if two poly3 are equal', (t) => {
  const polyA = fromPoints([[0, 0, 0], [1, 0, 0], [1, 0, 1]])
  const polyB = fromPoints([[1, 1, 1], [1, 0, 0], [1, 0, 1]])
  const polyC = fromPoints([[0, 0, 0], [1, 0, 0], [1, 0, 1], [1, 1, 1]])

  t.is(equals(polyA, polyA), true)

  t.is(equals(polyA, polyB), false)
  t.is(equals(polyB, polyA), false)

  t.is(equals(polyA, polyC), false)
  t.is(equals(polyC, polyA), false)
})
