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
  t.true(compareVectors(x4, [0, 0]))
  const x5 = closestPoint(line2, [1, 0])
  t.true(compareVectors(x5, [0.5, -0.5]))
  const x6 = closestPoint(line2, [2, 0])
  t.true(compareVectors(x6, [1, -1]))
  const x7 = closestPoint(line2, [3, 0])
  t.true(compareVectors(x7, [1.5, -1.5]))
  const x8 = closestPoint(line2, [4, 0])
  t.true(compareVectors(x8, [2, -2]))
  const x9 = closestPoint(line2, [5, 0])
  t.true(compareVectors(x9, [2.5, -2.5]))
  const x10 = closestPoint(line2, [50, 0])
  t.true(compareVectors(x10, [25, -25]))

  const ya = closestPoint(line2, [-5, 5])
  t.true(compareVectors(ya, [-5, 5]))
  const yb = closestPoint(line2, [5, -5])
  t.true(compareVectors(yb, [5, -5]))

  const za = closestPoint(line2, [4, -6])
  t.true(compareVectors(za, [5, -5]))
  const zb = closestPoint(line2, [3, -7])
  t.true(compareVectors(zb, [5, -5]))

  t.true(true)
})

test('line2: closestPoint() should return proper values (issue #1225)', (t) => {
  const line = fromPoints(create(), [10, 0], [0, 10])
  const closest = closestPoint(line, [0, 0])
  t.true(compareVectors(closest, [5, 5]))
})
