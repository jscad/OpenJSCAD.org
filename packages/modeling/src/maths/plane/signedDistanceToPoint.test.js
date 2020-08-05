const test = require('ava')
const { signedDistanceToPoint, fromValues } = require('./index')

test('plane: signedDistanceToPoint() should return correct values', (t) => {
  const plane1 = fromValues(0, 0, 0, 0)
  const distance1 = signedDistanceToPoint(plane1, [0, 0, 0])
  t.true(distance1 === 0.0)

  const plane2 = fromValues(1, 1, 1, 1)
  const distance2 = signedDistanceToPoint(plane2, [-1, -1, -1])
  t.true(distance2 === (-3.0 - 1))

  const plane3 = fromValues(5, 5, 5, 5)
  const distance3 = signedDistanceToPoint(plane3, [5, 5, 5])
  t.true(distance3 === (75.0 - 5))

  const plane4 = fromValues(5, 5, 5, 5)
  const distance4 = signedDistanceToPoint(plane4, [-2, 3, -4])
  t.true(distance4 === (-15.0 - 5))
})
