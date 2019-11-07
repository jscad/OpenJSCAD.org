const test = require('ava')
const { squaredDistance, fromValues } = require('./index')

const { nearlyEqual } = require('../../../test/helpers/index')
const { EPS } = require('../constants')

test('vec3: squaredDistance() should return correct values', (t) => {
  const vec0 = fromValues(0, 0, 0)
  const vec1 = fromValues(0, 0, 0)
  const distance1 = squaredDistance(vec0, vec1)
  nearlyEqual(t, distance1, 0.0, EPS)

  const vec2 = fromValues(1, 2, 3)
  const distance2 = squaredDistance(vec1, vec2)
  nearlyEqual(t, distance2, 14.00000, EPS)

  const vec3 = fromValues(1, -2, 3)
  const distance3 = squaredDistance(vec1, vec3)
  nearlyEqual(t, distance3, 14.00000, EPS)

  const vec4 = fromValues(-1, -2, 3)
  const distance4 = squaredDistance(vec1, vec4)
  nearlyEqual(t, distance4, 14.00000, EPS)

  const vec5 = fromValues(-1, 2, 3)
  const distance5 = squaredDistance(vec1, vec5)
  nearlyEqual(t, distance5, 14.00000, EPS)

  const vec6 = fromValues(1, 2, -3)
  const distance6 = squaredDistance(vec1, vec6)
  nearlyEqual(t, distance6, 14.00000, EPS)

  const vec7 = fromValues(1, -2, -3)
  const distance7 = squaredDistance(vec1, vec7)
  nearlyEqual(t, distance7, 14.00000, EPS)

  const vec8 = fromValues(-1, -2, -3)
  const distance8 = squaredDistance(vec1, vec8)
  nearlyEqual(t, distance8, 14.00000, EPS)

  const vec9 = fromValues(-1, 2, -3)
  const distance9 = squaredDistance(vec1, vec9)
  nearlyEqual(t, distance9, 14.00000, EPS)

  t.true(true)
})
