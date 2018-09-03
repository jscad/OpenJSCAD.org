const test = require('ava')
const {angle, fromValues} = require('./index')

const {nearlyEqual} = require('../../../../test/helpers/index')
const {EPS} = require('../../constants')

test('vec3: angle() should return correct values', t => {
  const vec_a1 = fromValues(5, 5, 5)
  const vec_b1 = fromValues(0, 0, 0)
  const angle1 = angle(vec_a1, vec_b1)
  nearlyEqual(t, angle1, 1.57079, EPS) // any vector with all zeros

  const vec_a3 = fromValues(1, 0, 0)
  const vec_b3 = fromValues(1, 0, 0)
  const angle3 = angle(vec_a3, vec_b3)
  nearlyEqual(t, angle3, 0.00000, EPS)

  const vec_a2 = fromValues(1, 0, 0)
  const vec_b2 = fromValues(0, 1, 0)
  const angle2 = angle(vec_a2, vec_b2)
  nearlyEqual(t, angle2, 1.57079, EPS)

  const vec_a4 = fromValues(1, 1, 1)
  const vec_b4 = fromValues(-1, -1, -1)
  const angle4 = angle(vec_a4, vec_b4)
  nearlyEqual(t, angle4, 3.14132, EPS)

  t.true(true)
})
