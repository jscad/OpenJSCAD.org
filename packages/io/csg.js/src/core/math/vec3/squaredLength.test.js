const test = require('ava')
const {squaredLength, fromValues} = require('./index')

const {nearlyEqual} = require('../../../../test/helpers/index')
const {EPS} = require('../../constants')

test('vec3: length() should return correct values', t => {
  const vec_a1 = fromValues(0, 0, 0)
  const length1 = squaredLength(vec_a1)
  nearlyEqual(t, length1, 0.0, EPS)

  const vec_a2 = fromValues(1, 2, 3)
  const length2 = squaredLength(vec_a2)
  nearlyEqual(t, length2, 14.00000, EPS)

  const vec_a3 = fromValues(1, -2, 3)
  const length3 = squaredLength(vec_a3)
  nearlyEqual(t, length3, 14.00000, EPS)

  const vec_a4 = fromValues(-1, -2, 3)
  const length4 = squaredLength(vec_a4)
  nearlyEqual(t, length4, 14.00000, EPS)

  const vec_a5 = fromValues(-1, 2, 3)
  const length5 = squaredLength(vec_a5)
  nearlyEqual(t, length5, 14.00000, EPS)

  const vec_a6 = fromValues(1, 2, -3)
  const length6 = squaredLength(vec_a6)
  nearlyEqual(t, length6, 14.00000, EPS)

  const vec_a7 = fromValues(1, -2, -3)
  const length7 = squaredLength(vec_a7)
  nearlyEqual(t, length7, 14.00000, EPS)

  const vec_a8 = fromValues(-1, -2, -3)
  const length8 = squaredLength(vec_a8)
  nearlyEqual(t, length8, 14.00000, EPS)

  const vec_a9 = fromValues(-1, 2, -3)
  const length9 = squaredLength(vec_a9)
  nearlyEqual(t, length9, 14.00000, EPS)

  t.true(true)
})
