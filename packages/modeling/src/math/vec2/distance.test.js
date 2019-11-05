const test = require('ava')
const { distance, fromValues } = require('./index')

const { nearlyEqual } = require('../../../test/helpers/index')
const { EPS } = require('../constants')

test('vec2: distance() should return correct values', (t) => {
  const vec0 = fromValues(0, 0)
  const vec1 = fromValues(0, 0)
  const distance1 = distance(vec0, vec1)
  nearlyEqual(t, distance1, 0.0, EPS)

  const vec2 = fromValues(1, 2)
  const distance2 = distance(vec0, vec2)
  nearlyEqual(t, distance2, 2.23606, EPS)

  const vec3 = fromValues(1, -2)
  const distance3 = distance(vec0, vec3)
  nearlyEqual(t, distance3, 2.23606, EPS)

  const vec4 = fromValues(-1, -2)
  const distance4 = distance(vec0, vec4)
  nearlyEqual(t, distance4, 2.23606, EPS)

  const vec5 = fromValues(-1, 2)
  const distance5 = distance(vec0, vec5)
  nearlyEqual(t, distance5, 2.23606, EPS)

  t.true(true)
})
