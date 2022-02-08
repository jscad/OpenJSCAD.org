const test = require('ava')
const { angle, fromValues } = require('./index')

const { nearlyEqual } = require('../../../test/helpers/index')
const { EPS } = require('../constants')

test('vec3: angle() should return correct values', (t) => {
  const vec0 = fromValues(5, 5, 5)
  const vec1 = fromValues(0, 0, 0)
  const angle1 = angle(vec0, vec1)
  nearlyEqual(t, angle1, 1.57079, EPS) // any vector with all zeros

  const veca3 = fromValues(1, 0, 0)
  const vec3 = fromValues(1, 0, 0)
  const angle3 = angle(veca3, vec3)
  nearlyEqual(t, angle3, 0.00000, EPS)

  const veca2 = fromValues(1, 0, 0)
  const vec2 = fromValues(0, 1, 0)
  const angle2 = angle(veca2, vec2)
  nearlyEqual(t, angle2, 1.57079, EPS)

  const veca4 = fromValues(1, 1, 1)
  const vec4 = fromValues(-1, -1, -1)
  const angle4 = angle(veca4, vec4)
  nearlyEqual(t, angle4, 3.14159, EPS)

  const vec5a = fromValues(1, 0, 0)
  const vec5b = fromValues(1, 1, 0)
  const angle5 = angle(vec5a, vec5b)
  nearlyEqual(t, angle5, 0.785398, EPS)

  // tiny values
  const vec6a = fromValues(1, 0, 0)
  const vec6b = fromValues(1e-200, 1e-200, 0)
  const angle6 = angle(vec6a, vec6b)
  nearlyEqual(t, angle6, 0.785398, EPS)

  // huge values
  const vec7a = fromValues(1, 0, 0)
  const vec7b = fromValues(1e200, 1e200, 0)
  const angle7 = angle(vec7a, vec7b)
  nearlyEqual(t, angle7, 0.785398, EPS)

  t.true(true)
})
