const test = require('ava')

const { equals, fromPoints } = require('./index')

test('slice: equals() should return proper value', (t) => {
  const sliceA = fromPoints([[0, 0], [1, 0], [1, 1]])
  const sliceB = fromPoints([[0, 1], [1, 0], [1, 1]])
  const sliceC = fromPoints([[0, 0], [1, 0], [1, 1], [0, 0]])

  t.is(equals(sliceA, sliceA), true)

  t.is(equals(sliceA, sliceB), false)
  t.is(equals(sliceB, sliceA), false)

  t.is(equals(sliceA, sliceC), false)
  t.is(equals(sliceC, sliceA), false)
})
