const appendPoint = require('./appendPoint')
const equals = require('./equals')
const fromPointArray = require('./fromPointArray')
const test = require('ava')

test('appendPoint: An empty path with a point appended is the same as a path created from that point', t => {
  const empty = fromPointArray({}, [])
  const origin = fromPointArray({}, [[0, 0, 0]])
  t.true(equals(appendPoint({}, [0, 0, 0], empty), origin))
})

test('appendPoint: Appending to a closed path fails', t => {
  t.throws(() => appendPoint({}, [0, 0, 0], fromPointArray({ closed: true }, [])),
           'Cannot append to closed path')
})
