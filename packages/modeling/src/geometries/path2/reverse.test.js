const test = require('ava')

const { reverse, equals, fromPoints } = require('./index')

test('reverse: The reverse of a path has reversed points', (t) => {
  const pointArray = [[0, 0], [1, 1]]
  t.false(equals(reverse(fromPoints({}, pointArray)),
    fromPoints({}, pointArray)))
})
