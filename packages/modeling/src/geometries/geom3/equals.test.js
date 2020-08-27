const test = require('ava')

const { equals, fromPoints } = require('./index')

test('equals: checks if two geom3 are equal', (t) => {
  const geomA = fromPoints([[[0, 0, 0], [1, 0, 0], [1, 0, 1]]])
  const geomB = fromPoints([[[1, 1, 1], [1, 0, 0], [1, 0, 1]]])
  const geomC = fromPoints([[[0, 0, 0], [1, 0, 0], [1, 0, 1]], [[1, 1, 1], [1, 1, 1], [1, 1, 1]]])

  t.is(equals(geomA, geomA), true)

  t.is(equals(geomA, geomB), false)
  t.is(equals(geomB, geomA), false)

  t.is(equals(geomA, geomC), false)
  t.is(equals(geomC, geomA), false)
})
