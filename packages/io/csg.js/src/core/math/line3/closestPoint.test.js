const test = require('ava')
const { closestPoint, create, fromPoints } = require('./index')

const { compareVectors } = require('../../../../test/helpers/index')

test('line3: closestPoint() should return proper values', (t) => {
  const line1 = create() // line follows X axis
  const x1 = closestPoint([0, 0, 0], line1)
  t.true(compareVectors(x1, [0, 0, 0]))
  const x2 = closestPoint([0, 1, 0], line1)
  t.true(compareVectors(x2, [0, 0, 0]))
  const x3 = closestPoint([6, 0, 0], line1)
  t.true(compareVectors(x3, [0, 0, 0])) // rounding errors

  const line2 = fromPoints([-5, -5, -5], [5, 5, 5])
  const x4 = closestPoint([0, 0, 0], line2)
  t.true(compareVectors(x4, [0.000000000000, 0.000000000000, 0.00000000000]))
  const x5 = closestPoint([1, 0, 0], line2)
  t.true(compareVectors(x5, [0.33333349227905273, 0.33333349227905273, 0.33333349227905273]))
  const x6 = closestPoint([2, 0, 0], line2)
  t.true(compareVectors(x6, [0.6666665077209473, 0.6666665077209473, 0.6666665077209473]))
  const x7 = closestPoint([3, 0, 0], line2)
  t.true(compareVectors(x7, [1, 1, 1]))
  const x8 = closestPoint([4, 0, 0], line2)
  t.true(compareVectors(x8, [1.3333334922790527, 1.3333334922790527, 1.3333334922790527]))
  const x9 = closestPoint([5, 0, 0], line2)
  t.true(compareVectors(x9, [1.6666665077209473, 1.6666665077209473, 1.6666665077209473]))
  const x10 = closestPoint([50, 0, 0], line2)
  t.true(compareVectors(x10, [16.66666603088379, 16.66666603088379, 16.66666603088379]))

  const ya = closestPoint([-5, -5, -5], line2)
  t.true(compareVectors(ya, [-5, -5, -5]))
  const yb = closestPoint([5, 5, 5], line2)
  t.true(compareVectors(yb, [5, 5, 5]))

  t.true(true)
})
