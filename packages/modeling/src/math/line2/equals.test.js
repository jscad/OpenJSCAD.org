const test = require('ava')
const { equals, fromValues } = require('./index')

test('line2: equals() should return correct booleans', (t) => {
  const line0 = fromValues(0, 0, 0)
  const line1 = fromValues(0, 0, 0)
  t.true(equals(line0, line1))

  const line2 = fromValues(1, 1, 1)
  t.false(equals(line0, line2))

  const line3 = fromValues(1, 1, 0)
  t.false(equals(line0, line3))

  const line4 = fromValues(0, 1, 1)
  t.false(equals(line0, line4))

  const line5 = fromValues(1, 0, 0)
  t.false(equals(line0, line5))

  const line6 = fromValues(0, 1, 0)
  t.false(equals(line0, line6))

  const line7 = fromValues(0, 0, 1)
  t.false(equals(line0, line7))
})
