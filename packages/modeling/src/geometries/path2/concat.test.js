const test = require('ava')

const { concat, equals, fromPoints } = require('./index')

test('concat: No paths produces an empty open path', (t) => {
  t.true(equals(concat(), fromPoints({ closed: false }, [])))
})

test('concat: empty paths produces an empty open path', (t) => {
  t.true(equals(concat(fromPoints({}, []), fromPoints({}, [])), fromPoints({ closed: false }, [])))
})

test('concat: Two open paths produces a open path', (t) => {
  t.true(equals(concat(fromPoints({ closed: false }, [[0, 0]]),
    fromPoints({ closed: false }, [[1, 1]])),
  fromPoints({ closed: false }, [[0, 0], [1, 1]])))
})

test('concat: An open path and a closed path produces a closed path', (t) => {
  t.true(equals(concat(fromPoints({ closed: false }, [[0, 0]]),
    fromPoints({ closed: true }, [[1, 1]])),
  fromPoints({ closed: true }, [[0, 0], [1, 1]])))
})

test('concat: A closed path and an open path throws an error', (t) => {
  t.throws(() => concat(fromPoints({ closed: true }, [[0, 0]]),
    fromPoints({ closed: false }, [[1, 1]])),
  { message: 'Cannot concatenate to a closed path' })
})
