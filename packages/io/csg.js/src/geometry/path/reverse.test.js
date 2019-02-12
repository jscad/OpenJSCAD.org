const equals = require('./equals')
const fromPointArray = require('./fromPointArray')
const reverse = require('./reverse')
const test = require('ava')

test('reverse: The reverse of a path has reversed points', t => {
  const pointArray = [[0, 0, 0], [1, 1, 0]]
  t.false(equals(reverse(fromPointArray({}, pointArray)),
                fromPointArray({}, pointArray)))
})
