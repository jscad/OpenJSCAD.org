const test = require('ava')
const { distance, fromValues } = require('./index')

const { nearlyEqual } = require('../../../test/helpers/index')
const { EPS } = require('../constants')

test('vec3: distance() should return correct values', (t) => {
  const vec0 = fromValues(0, 0, 0)
  const vec1 = fromValues(0, 0, 0)
  const distance1 = distance(vec0, vec1)
  nearlyEqual(t, distance1, 0.0, EPS)

  const vec2 = fromValues(1, 2, 3)
  const distance2 = distance(vec0, vec2)
  nearlyEqual(t, distance2, 3.74165, EPS)

  const vec3 = fromValues(1, -2, 3)
  const distance3 = distance(vec0, vec3)
  nearlyEqual(t, distance3, 3.74165, EPS)

  const vec4 = fromValues(-1, -2, 3)
  const distance4 = distance(vec0, vec4)
  nearlyEqual(t, distance4, 3.74165, EPS)

  const vec5 = fromValues(-1, 2, 3)
  const distance5 = distance(vec0, vec5)
  nearlyEqual(t, distance5, 3.74165, EPS)

  const vec6 = fromValues(1, 2, -3)
  const distance6 = distance(vec0, vec6)
  nearlyEqual(t, distance6, 3.74165, EPS)

  const vec7 = fromValues(1, -2, -3)
  const distance7 = distance(vec0, vec7)
  nearlyEqual(t, distance7, 3.74165, EPS)

  const vec8 = fromValues(-1, -2, -3)
  const distance8 = distance(vec0, vec8)
  nearlyEqual(t, distance8, 3.74165, EPS)

  const vec9 = fromValues(-1, 2, -3)
  const distance9 = distance(vec0, vec9)
  nearlyEqual(t, distance9, 3.74165, EPS)

  t.true(true)
})
