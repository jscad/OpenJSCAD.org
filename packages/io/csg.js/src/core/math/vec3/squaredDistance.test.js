const test = require('ava')
const {squaredDistance, fromValues} = require('./index')

const {nearlyEqual} = require('../../../../test/helpers/index')
const {EPS} = require('../../constants')

test('vec3: squaredDistance() should return correct values', t => {
  const vec_a1 = fromValues(0, 0, 0)
  const vec_b1 = fromValues(0, 0, 0)
  const distance1 = squaredDistance(vec_a1, vec_b1)
  nearlyEqual(t, distance1, 0.0, EPS)

  const vec_b2 = fromValues(1, 2, 3)
  const distance2 = squaredDistance(vec_a1, vec_b2)
  nearlyEqual(t, distance2, 14.00000, EPS)

  const vec_b3 = fromValues(1, -2, 3)
  const distance3 = squaredDistance(vec_a1, vec_b3)
  nearlyEqual(t, distance3, 14.00000, EPS)

  const vec_b4 = fromValues(-1, -2, 3)
  const distance4 = squaredDistance(vec_a1, vec_b4)
  nearlyEqual(t, distance4, 14.00000, EPS)

  const vec_b5 = fromValues(-1, 2, 3)
  const distance5 = squaredDistance(vec_a1, vec_b5)
  nearlyEqual(t, distance5, 14.00000, EPS)

  const vec_b6 = fromValues(1, 2, -3)
  const distance6 = squaredDistance(vec_a1, vec_b6)
  nearlyEqual(t, distance6, 14.00000, EPS)

  const vec_b7 = fromValues(1, -2, -3)
  const distance7 = squaredDistance(vec_a1, vec_b7)
  nearlyEqual(t, distance7, 14.00000, EPS)

  const vec_b8 = fromValues(-1, -2, -3)
  const distance8 = squaredDistance(vec_a1, vec_b8)
  nearlyEqual(t, distance8, 14.00000, EPS)

  const vec_b9 = fromValues(-1, 2, -3)
  const distance9 = squaredDistance(vec_a1, vec_b9)
  nearlyEqual(t, distance9, 14.00000, EPS)

  t.true(true)
})
