const test = require('ava')
const { length, fromValues } = require('./index')

const { nearlyEqual } = require('../../../test/helpers/index')
const { EPS } = require('../constants')

test('vec2: length() should return correct values', (t) => {
  const vec1 = fromValues(0, 0)
  const length1 = length(vec1)
  nearlyEqual(t, length1, 0.0, EPS)

  const vec2 = fromValues(1, 2)
  const length2 = length(vec2)
  nearlyEqual(t, length2, 2.23606, EPS)

  const vec3 = fromValues(1, -2)
  const length3 = length(vec3)
  nearlyEqual(t, length3, 2.23606, EPS)

  const vec4 = fromValues(-1, -2)
  const length4 = length(vec4)
  nearlyEqual(t, length4, 2.23606, EPS)

  const vec5 = fromValues(-1, 2)
  const length5 = length(vec5)
  nearlyEqual(t, length5, 2.23606, EPS)

  t.true(true)
})
