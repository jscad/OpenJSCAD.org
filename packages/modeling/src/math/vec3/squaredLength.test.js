const test = require('ava')
const { squaredLength, fromValues } = require('./index')

const { nearlyEqual } = require('../../../test/helpers/index')
const { EPS } = require('../constants')

test('vec3: length() should return correct values', (t) => {
  const vec1 = fromValues(0, 0, 0)
  const length1 = squaredLength(vec1)
  nearlyEqual(t, length1, 0.0, EPS)

  const vec2 = fromValues(1, 2, 3)
  const length2 = squaredLength(vec2)
  nearlyEqual(t, length2, 14.00000, EPS)

  const vec3 = fromValues(1, -2, 3)
  const length3 = squaredLength(vec3)
  nearlyEqual(t, length3, 14.00000, EPS)

  const vec4 = fromValues(-1, -2, 3)
  const length4 = squaredLength(vec4)
  nearlyEqual(t, length4, 14.00000, EPS)

  const vec5 = fromValues(-1, 2, 3)
  const length5 = squaredLength(vec5)
  nearlyEqual(t, length5, 14.00000, EPS)

  const vec6 = fromValues(1, 2, -3)
  const length6 = squaredLength(vec6)
  nearlyEqual(t, length6, 14.00000, EPS)

  const vec7 = fromValues(1, -2, -3)
  const length7 = squaredLength(vec7)
  nearlyEqual(t, length7, 14.00000, EPS)

  const vec8 = fromValues(-1, -2, -3)
  const length8 = squaredLength(vec8)
  nearlyEqual(t, length8, 14.00000, EPS)

  const vec9 = fromValues(-1, 2, -3)
  const length9 = squaredLength(vec9)
  nearlyEqual(t, length9, 14.00000, EPS)

  t.true(true)
})
