const test = require('ava')
const { equals, fromPointAndDirection, create } = require('./index')

test('line3: equals() should return correct booleans', (t) => {
  const line0 = fromPointAndDirection(create(), [0, 0, 0], [1, 1, 1])
  const line1 = fromPointAndDirection(create(), [0, 0, 0], [1, 1, 1])
  t.true(equals(line0, line1))

  const line2 = fromPointAndDirection(create(), [0, 0, 0], [0, 1, 0])
  t.false(equals(line0, line2))

  const line3 = fromPointAndDirection(create(), [1, 0, 1], [0, 0, 0])
  t.false(equals(line0, line3))

  const line4 = fromPointAndDirection(create(), [1, 1, 1], [1, 1, 1])
  t.false(equals(line0, line4))
})
