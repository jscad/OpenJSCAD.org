const test = require('ava')
const { closestPoint, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: closestPoint() should return proper values', (t) => {
  const line1 = create()
  const x1 = closestPoint(line1, [0, 0])
  t.true(compareVectors(x1, [0, 0]))
  const x2 = closestPoint(line1, [0, 1])
  t.true(compareVectors(x2, [0, 0]))
  // const x3 = closestPoint([6, 0], line1)
  // t.true(compareVectors(x3, [6, -0])) // rounding errors

  const line2 = fromPoints(create(), [-5, 5], [5, -5])
  const x4 = closestPoint(line2, [0, 0])
  t.true(compareVectors(x4, [0.000000000000, 0.000000000000]))
  const x5 = closestPoint(line2, [1, 0])
  t.true(compareVectors(x5, [0.500000000000, -0.500000000000]))
  const x6 = closestPoint(line2, [2, 0])
  t.true(compareVectors(x6, [1.000000000000, -1.000000000000]))
  const x7 = closestPoint(line2, [3, 0])
  t.true(compareVectors(x7, [1.500000000000, -1.500000000000]))
  const x8 = closestPoint(line2, [4, 0])
  t.true(compareVectors(x8, [2.000000000000, -2.000000000000]))
  const x9 = closestPoint(line2, [5, 0])
  t.true(compareVectors(x9, [2.500000000000, -2.500000000000]))
  const x10 = closestPoint(line2, [50, 0])
  t.true(compareVectors(x10, [25.000000000000, -25.000000000000]))

  const ya = closestPoint(line2, [-5, 5])
  t.true(compareVectors(ya, [-5.000000000000, 5.000000000000]))
  const yb = closestPoint(line2, [5, -5])
  t.true(compareVectors(yb, [5.000000000000, -5.000000000000]))

  const za = closestPoint(line2, [4, -6])
  t.true(compareVectors(za, [5.000000000000, -5.000000000000]))
  const zb = closestPoint(line2, [3, -7])
  t.true(compareVectors(zb, [5.000000000000, -5.000000000000]))

  t.true(true)
})
