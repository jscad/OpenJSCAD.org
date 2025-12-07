import test from 'ava'

import { concat, equals, fromVertices } from './index.js'

test('concat: no paths produces an empty open path', (t) => {
  t.true(equals(concat(), fromVertices({ closed: false }, [])))
})

test('concat: empty paths produces an empty open path', (t) => {
  t.true(equals(concat(fromVertices({}, []), fromVertices({}, [])), fromVertices({ closed: false }, [])))
})

test('concat: many open paths produces a open path', (t) => {
  const p1 = fromVertices({ closed: false }, [[0, 0, 0]])
  const p2 = fromVertices({ closed: false }, [[1, 1, 0]])
  const p3 = fromVertices({ closed: false }, [[1, 1, 0], [3, 3, 0]])

  const result = concat(p1, p2, p3)
  t.true(equals(result, fromVertices({}, [[0, 0, 0], [1, 1, 0], [3, 3, 0]])))
  t.is(p1.vertices.length, 1)
  t.is(p2.vertices.length, 1)
  t.is(p3.vertices.length, 2)
})

test('concat: an open path and a closed path produces a closed path', (t) => {
  t.true(equals(concat(fromVertices({ closed: false }, [[0, 0, 0]]),
    fromVertices({ closed: true }, [[1, 1, 0]])),
  fromVertices({ closed: true }, [[0, 0, 0], [1, 1, 0]])))
})

test('concat: a closed path and an open path throws an error', (t) => {
  const p1 = fromVertices({ closed: true }, [[0, 0, 0]])
  const p2 = fromVertices({ closed: false }, [[1, 1, 0]])
  t.throws(() => concat(p1, p2), { message: 'Cannot concatenate to a closed path; check the 1th path' })
})
