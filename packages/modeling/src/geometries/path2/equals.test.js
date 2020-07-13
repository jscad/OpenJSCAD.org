const test = require('ava')

const { equals, fromPoints } = require('./index')

test('equals: two paths with different points are not equal', (t) => {
  const p1 = fromPoints({ closed: false }, [[0, 0], [2, 0], [2, 1]])
  const p2 = fromPoints({ closed: false }, [[0, 0], [2, 0], [2, 1], [0, 1]])
  t.false(equals(p1, p2))

  const p3 = fromPoints({ closed: true }, [[2, 0], [2, 1], [0, 1], [1, 0]])
  const p4 = fromPoints({ closed: true }, [[0, 0], [2, 0], [2, 1], [0, 1]])
  t.false(equals(p3, p4))
})

test('equals: two open paths with the same points are equal', (t) => {
  const p1 = fromPoints({ closed: false }, [[0, 0], [2, 0], [2, 1], [0, 1]])
  const p2 = fromPoints({ closed: false }, [[0, 0], [2, 0], [2, 1], [0, 1]])
  t.true(equals(p1, p2))
})

test('equals: two open paths with the same points rotated are unequal', (t) => {
  t.false(equals(fromPoints({ closed: false }, [[0, 0], [2, 0], [2, 1], [0, 1]]),
    fromPoints({ closed: false }, [[2, 0], [2, 1], [0, 1], [0, 0]])))
})

test('equals: two closed paths with the same points are equal', (t) => {
  t.true(equals(fromPoints({ closed: true }, [[0, 0], [2, 0], [2, 1], [0, 1]]),
    fromPoints({ closed: true }, [[0, 0], [2, 0], [2, 1], [0, 1]])))

  // rotated
  t.true(equals(fromPoints({ closed: true }, [[0, 0], [2, 0], [2, 1], [0, 1]]),
    fromPoints({ closed: true }, [[2, 0], [2, 1], [0, 1], [0, 0]])))
})

test('equals: closed path and open path with the same points are unequal', (t) => {
  t.false(equals(fromPoints({ closed: true }, [[0, 0], [2, 0], [2, 1], [0, 1]]),
    fromPoints({ closed: false }, [[0, 0], [2, 0], [2, 1], [0, 1]])))
})
