const test = require('ava')
const { length, fromValues } = require('./index')

const { nearlyEqual } = require('../../../test/helpers/index')
const { EPS } = require('../constants')

test('vec3: length() should return correct values', (t) => {
  const vec1 = fromValues(0, 0, 0)
  const length1 = length(vec1)
  nearlyEqual(t, length1, 0.0, EPS)

  const vec2 = fromValues(1, 2, 3)
  const length2 = length(vec2)
  nearlyEqual(t, length2, 3.74165, EPS)

  const vec3 = fromValues(1, -2, 3)
  const length3 = length(vec3)
  nearlyEqual(t, length3, 3.74165, EPS)

  const vec4 = fromValues(-1, -2, 3)
  const length4 = length(vec4)
  nearlyEqual(t, length4, 3.74165, EPS)

  const vec5 = fromValues(-1, 2, 3)
  const length5 = length(vec5)
  nearlyEqual(t, length5, 3.74165, EPS)

  const vec6 = fromValues(1, 2, -3)
  const length6 = length(vec6)
  nearlyEqual(t, length6, 3.74165, EPS)

  const vec7 = fromValues(1, -2, -3)
  const length7 = length(vec7)
  nearlyEqual(t, length7, 3.74165, EPS)

  const vec8 = fromValues(-1, -2, -3)
  const length8 = length(vec8)
  nearlyEqual(t, length8, 3.74165, EPS)

  const vec9 = fromValues(-1, 2, -3)
  const length9 = length(vec9)
  nearlyEqual(t, length9, 3.74165, EPS)

  t.true(true)
})
