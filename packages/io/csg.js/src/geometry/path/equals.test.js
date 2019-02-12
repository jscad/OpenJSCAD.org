const equals = require('./equals')
const fromPointArray = require('./fromPointArray')
const test = require('ava')

test('equals: Two open paths with the same points are equal', t => {
  t.true(equals(fromPointArray({ closed: false }, [[0, 0], [2, 0], [2, 1], [0, 1]]),
                fromPointArray({ closed: false }, [[0, 0], [2, 0], [2, 1], [0, 1]])))
})

test('equals: Two open paths with the same points rotated are unequal', t => {
  t.false(equals(fromPointArray({ closed: false }, [[0, 0], [2, 0], [2, 1], [0, 1]]),
                 fromPointArray({ closed: false }, [[2, 0], [2, 1], [0, 1], [0, 0]])))
})

test('equals: Two closed paths with the same points are equal', t => {
  t.true(equals(fromPointArray({ closed: true }, [[0, 0], [2, 0], [2, 1], [0, 1]]),
                fromPointArray({ closed: true }, [[0, 0], [2, 0], [2, 1], [0, 1]])))
})

test('equals: Two closed paths with the same points rotated are equal', t => {
  t.true(equals(fromPointArray({ closed: true }, [[0, 0], [2, 0], [2, 1], [0, 1]]),
                fromPointArray({ closed: true }, [[2, 0], [2, 1], [0, 1], [0, 0]])))
})

test('equals: A closed path and an option path with the same points are unequal', t => {
  t.false(equals(fromPointArray({ closed: true }, [[0, 0], [2, 0], [2, 1], [0, 1]]),
                 fromPointArray({ closed: false }, [[0, 0], [2, 0], [2, 1], [0, 1]])))
})
