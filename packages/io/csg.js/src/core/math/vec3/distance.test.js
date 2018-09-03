const test = require('ava')
const {distance, fromValues} = require('./index')

const {nearlyEqual} = require('../../../../test/helpers/index')
const {EPS} = require('../../constants')

test('vec3: distance() should return correct values', t => {
  const vec_a1 = fromValues(0, 0, 0)
  const vec_b1 = fromValues(0, 0, 0)
  const distance1 = distance(vec_a1, vec_b1)
  nearlyEqual(t, distance1, 0.0, EPS)

  const vec_b2 = fromValues(1, 2, 3)
  const distance2 = distance(vec_a1, vec_b2)
  nearlyEqual(t, distance2, 3.74165, EPS)

  const vec_b3 = fromValues(1, -2, 3)
  const distance3 = distance(vec_a1, vec_b3)
  nearlyEqual(t, distance3, 3.74165, EPS)

  const vec_b4 = fromValues(-1, -2, 3)
  const distance4 = distance(vec_a1, vec_b4)
  nearlyEqual(t, distance4, 3.74165, EPS)

  const vec_b5 = fromValues(-1, 2, 3)
  const distance5 = distance(vec_a1, vec_b5)
  nearlyEqual(t, distance5, 3.74165, EPS)

  const vec_b6 = fromValues(1, 2, -3)
  const distance6 = distance(vec_a1, vec_b6)
  nearlyEqual(t, distance6, 3.74165, EPS)

  const vec_b7 = fromValues(1, -2, -3)
  const distance7 = distance(vec_a1, vec_b7)
  nearlyEqual(t, distance7, 3.74165, EPS)

  const vec_b8 = fromValues(-1, -2, -3)
  const distance8 = distance(vec_a1, vec_b8)
  nearlyEqual(t, distance8, 3.74165, EPS)

  const vec_b9 = fromValues(-1, 2, -3)
  const distance9 = distance(vec_a1, vec_b9)
  nearlyEqual(t, distance9, 3.74165, EPS)

  t.true(true)
})
