import test from 'ava'

import { equals, fromVertices } from './index.js'

test('equals: two paths with different points are not equal', (t) => {
  const p1 = fromVertices({ closed: false }, [[0, 0, 0], [2, 0, 0], [2, 1, 0]])
  const p2 = fromVertices({ closed: false }, [[0, 0, 0], [2, 0, 0], [2, 1, 0], [0, 1, 0]])
  t.false(equals(p1, p2))

  const p3 = fromVertices({ closed: true }, [[2, 0, 0], [2, 1, 0], [0, 1, 0], [1, 0, 0]])
  const p4 = fromVertices({ closed: true }, [[0, 0, 0], [2, 0, 0], [2, 1, 0], [0, 1, 0]])
  t.false(equals(p3, p4))
})

test('equals: two open paths with the same points are equal', (t) => {
  const p1 = fromVertices({ closed: false }, [[0, 0, 0], [2, 0, 0], [2, 1, 0], [0, 1, 0]])
  const p2 = fromVertices({ closed: false }, [[0, 0, 0], [2, 0, 0], [2, 1, 0], [0, 1, 0]])
  t.true(equals(p1, p2))
})

test('equals: two open paths with the same points rotated are unequal', (t) => {
  t.false(equals(fromVertices({ closed: false }, [[0, 0, 0], [2, 0, 0], [2, 1, 0], [0, 1, 0]]),
    fromVertices({ closed: false }, [[2, 0, 0], [2, 1, 0], [0, 1, 0], [0, 0, 0]])))
})

test('equals: two closed paths with the same points are equal', (t) => {
  t.true(equals(fromVertices({ closed: true }, [[0, 0, 0], [2, 0, 0], [2, 1, 0], [0, 1, 0]]),
    fromVertices({ closed: true }, [[0, 0, 0], [2, 0, 0], [2, 1, 0], [0, 1, 0]])))

  // rotated
  t.true(equals(fromVertices({ closed: true }, [[0, 0, 0], [2, 0, 0], [2, 1, 0], [0, 1, 0]]),
    fromVertices({ closed: true }, [[2, 0, 0], [2, 1, 0], [0, 1, 0], [0, 0, 0]])))
})

test('equals: closed path and open path with the same points are unequal', (t) => {
  t.false(equals(fromVertices({ closed: true }, [[0, 0, 0], [2, 0, 0], [2, 1, 0], [0, 1, 0]]),
    fromVertices({ closed: false }, [[0, 0, 0], [2, 0, 0], [2, 1, 0], [0, 1, 0]])))
})
