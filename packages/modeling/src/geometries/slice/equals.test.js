import test from 'ava'

import { equals, fromVertices } from './index.js'

test('slice: equals() should return proper value', (t) => {
  const sliceA = fromVertices([[0, 0], [1, 0], [1, 1]])
  const sliceB = fromVertices([[0, 1], [1, 0], [1, 1]])
  const sliceC = fromVertices([[0, 0], [1, 0], [1, 1], [0, 0]])

  t.true(equals(sliceA, sliceA))

  t.false(equals(sliceA, sliceB))
  t.false(equals(sliceB, sliceA))

  t.false(equals(sliceA, sliceC))
  t.false(equals(sliceC, sliceA))
})
