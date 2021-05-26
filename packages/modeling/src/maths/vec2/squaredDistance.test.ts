import test from 'ava'
import { squaredDistance, fromValues } from './index'

import { nearlyEqual } from '../../../test/helpers/index'
import { EPS } from '../constants'

test('vec2: squaredDistance() should return correct values', (t) => {
  const vec0 = fromValues(0, 0)
  const vec1 = fromValues(0, 0)
  const distance1 = squaredDistance(vec0, vec1)
  nearlyEqual(t, distance1, 0.0, EPS)

  const vec2 = fromValues(1, 2)
  const distance2 = squaredDistance(vec0, vec2)
  nearlyEqual(t, distance2, 5.00000, EPS)

  const vec3 = fromValues(1, -2)
  const distance3 = squaredDistance(vec0, vec3)
  nearlyEqual(t, distance3, 5.00000, EPS)

  const vec4 = fromValues(-1, -2)
  const distance4 = squaredDistance(vec0, vec4)
  nearlyEqual(t, distance4, 5.00000, EPS)

  const vec5 = fromValues(-1, 2)
  const distance5 = squaredDistance(vec0, vec5)
  nearlyEqual(t, distance5, 5.00000, EPS)

  t.true(true)
})
