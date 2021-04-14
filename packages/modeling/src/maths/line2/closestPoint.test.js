const test = require('ava')
const { closestPoint, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line2: closestPoint() should return proper values', (t) => {
  const line1 = create()
  const x1 = closestPoint([0, 0], line1)
  t.true(compareVectors(x1, [0, 0]))
  const x2 = closestPoint([0, 1], line1)
  t.true(compareVectors(x2, [0, 0]))
  // const x3 = closestPoint([6, 0], line1)
  // t.true(compareVectors(x3, [6, -0])) // rounding errors

  const line2 = fromPoints([-5, 5], [5, -5])
  const x4 = closestPoint([0, 0], line2)
  t.true(compareVectors(x4, [0.000000000000, 0.000000000000]))
  const x5 = closestPoint([1, 0], line2)
  t.true(compareVectors(x5, [0.500000000000, -0.500000000000]))
  const x6 = closestPoint([2, 0], line2)
  t.true(compareVectors(x6, [1.000000000000, -1.000000000000]))
  const x7 = closestPoint([3, 0], line2)
  t.true(compareVectors(x7, [1.500000000000, -1.500000000000]))
  const x8 = closestPoint([4, 0], line2)
  t.true(compareVectors(x8, [2.000000000000, -2.000000000000]))
  const x9 = closestPoint([5, 0], line2)
  t.true(compareVectors(x9, [2.500000000000, -2.500000000000]))
  const x10 = closestPoint([50, 0], line2)
  t.true(compareVectors(x10, [25.000000000000, -25.000000000000]))

  const ya = closestPoint([-5, 5], line2)
  t.true(compareVectors(ya, [-5.000000000000, 5.000000000000]))
  const yb = closestPoint([5, -5], line2)
  t.true(compareVectors(yb, [5.000000000000, -5.000000000000]))

  const za = closestPoint([4, -6], line2)
  t.true(compareVectors(za, [5.000000000000, -5.000000000000]))
  const zb = closestPoint([3, -7], line2)
  t.true(compareVectors(zb, [5.000000000000, -5.000000000000]))

  t.true(true)
})
