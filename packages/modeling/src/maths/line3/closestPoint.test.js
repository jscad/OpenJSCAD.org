const test = require('ava')
const { closestPoint, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('line3: closestPoint() should return proper values', (t) => {
  const line1 = create() // line follows X axis
  const x1 = closestPoint(line1, [0, 0, 0])
  t.true(compareVectors(x1, [0, 0, 0]))
  const x2 = closestPoint(line1, [0, 1, 0])
  t.true(compareVectors(x2, [0, 0, 0]))
  const x3 = closestPoint(line1, [6, 0, 0])
  t.true(compareVectors(x3, [0, 0, 0])) // rounding errors

  const line2 = fromPoints(create(), [-5, -5, -5], [5, 5, 5])
  const x4 = closestPoint(line2, [0, 0, 0])
  t.true(compareVectors(x4, [0.000000000000, 0.000000000000, 0.00000000000]))
  const x5 = closestPoint(line2, [1, 0, 0])
  t.true(compareVectors(x5, [0.3333333333333339, 0.3333333333333339, 0.3333333333333339]))
  const x6 = closestPoint(line2, [2, 0, 0])
  t.true(compareVectors(x6, [0.6666666666666661, 0.6666666666666661, 0.6666666666666661]))
  const x7 = closestPoint(line2, [3, 0, 0])
  t.true(compareVectors(x7, [1, 1, 1]))
  const x8 = closestPoint(line2, [4, 0, 0])
  t.true(compareVectors(x8, [1.3333333333333348, 1.3333333333333348, 1.3333333333333348]))
  const x9 = closestPoint(line2, [5, 0, 0])
  t.true(compareVectors(x9, [1.666666666666667, 1.666666666666667, 1.666666666666667]))
  const x10 = closestPoint(line2, [50, 0, 0])
  t.true(compareVectors(x10, [16.666666666666668, 16.666666666666668, 16.666666666666668]))

  const ya = closestPoint(line2, [-5, -5, -5])
  t.true(compareVectors(ya, [-5, -5, -5]))
  const yb = closestPoint(line2, [5, 5, 5])
  t.true(compareVectors(yb, [5, 5, 5]))

  t.true(true)
})
