const equals = require('./equals')
const concat = require('./concat')
const fromPointArray = require('./fromPointArray')
const test = require('ava')

test('concat: No paths produces an empty open path', t => {
  t.true(equals(concat(), fromPointArray({ closed: false }, [])))
})

test('concat: Two open paths produces a open path', t => {
  t.true(equals(concat(fromPointArray({ closed: false }, [[0, 0]]),
                       fromPointArray({ closed: false }, [[1, 1]])),
                fromPointArray({ closed: false }, [[0, 0], [1, 1]])))
})

test('concat: An open path and a closed path produces a closed path', t => {
  t.true(equals(concat(fromPointArray({ closed: false }, [[0, 0]]),
                       fromPointArray({ closed: true }, [[1, 1]])),
                fromPointArray({ closed: true }, [[0, 0], [1, 1]])))
})

test('concat: A closed path and an open path throws an error', t => {
  t.throws(() => concat(fromPointArray({ closed: true }, [[0, 0]]),
                        fromPointArray({ closed: false }, [[1, 1]])),
           'Cannot concatenate to a closed path')
})
