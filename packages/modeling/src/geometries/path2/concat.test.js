const test = require('ava')

const { concat, equals, fromPoints } = require('./index')

test('concat: No paths produces an empty open path', (t) => {
  t.true(equals(concat(), fromPoints({ closed: false }, [])))
})

test('concat: empty paths produces an empty open path', (t) => {
  t.true(equals(concat(fromPoints({}, []), fromPoints({}, [])), fromPoints({ closed: false }, [])))
})

test('concat: many open paths produces a open path', (t) => {
  const p1 = fromPoints({ closed: false }, [[0, 0]])
  const p2 = fromPoints({ closed: false }, [[1, 1]])
  const p3 = fromPoints({ closed: false }, [[1, 1], [3, 3]])

  const result = concat(p1, p2, p3)
  t.true(equals(result, fromPoints({}, [[0, 0], [1, 1], [3, 3]])))
  t.is(p1.points.length, 1)
  t.is(p2.points.length, 1)
  t.is(p3.points.length, 2)
})

test('concat: An open path and a closed path produces a closed path', (t) => {
  t.true(equals(concat(fromPoints({ closed: false }, [[0, 0]]),
    fromPoints({ closed: true }, [[1, 1]])),
  fromPoints({ closed: true }, [[0, 0], [1, 1]])))
})

test('concat: A closed path and an open path throws an error', (t) => {
  const p1 = fromPoints({ closed: true }, [[0, 0]])
  const p2 = fromPoints({ closed: false }, [[1, 1]])
  t.throws(() => concat(p1, p2), { message: 'Cannot concatenate to a closed path; check the 1th path' })
})
