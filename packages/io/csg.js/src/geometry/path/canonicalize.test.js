const appendPoint = require('./appendPoint')
const canonicalize = require('./canonicalize')
const equals = require('./equals')
const fromPointArray = require('./fromPointArray')
const test = require('ava')

test('canonicalize: An empty path is non-canonical on creation', t => {
  t.false(fromPointArray({}, []).isCanonicalized)
})

test('canonicalize: A non-empty path is not canonical on creation', t => {
  t.false(fromPointArray({}, [[0, 0, 0]]).isCanonicalized)
})

test('canonicalize: A canonicalized path is canonical', t => {
  t.true(canonicalize(fromPointArray({}, [[0, 0, 0]])).isCanonicalized)
})

test('canonicalize: Appending to a canonicalized path produces a non-canonical path', t => {
  t.false(appendPoint({},
                      [1, 1, 0],
                      canonicalize(fromPointArray({}, [[0, 0, 0]])))
              .isCanonicalized)
})
