import test from 'ava'

import { equals, fromPoints } from './index.js'

test('slice: equals() should return proper value', (t) => {
  const sliceA = fromPoints([[0, 0], [1, 0], [1, 1]])
  const sliceB = fromPoints([[0, 1], [1, 0], [1, 1]])
  const sliceC = fromPoints([[0, 0], [1, 0], [1, 1], [0, 0]])

  t.true(equals(sliceA, sliceA))

  t.false(equals(sliceA, sliceB))
  t.false(equals(sliceB, sliceA))

  t.false(equals(sliceA, sliceC))
  t.false(equals(sliceC, sliceA))
})
