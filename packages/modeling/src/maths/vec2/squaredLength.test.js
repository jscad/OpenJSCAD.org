import test from 'ava'

import { EPS } from '../constants.js'

import { squaredLength, fromValues } from './index.js'

import { nearlyEqual } from '../../../test/helpers/index.js'

test('vec2: length() should return correct values', (t) => {
  const vec1 = fromValues(0, 0)
  const length1 = squaredLength(vec1)
  nearlyEqual(t, length1, 0.0, EPS)

  const vec2 = fromValues(1, 2)
  const length2 = squaredLength(vec2)
  nearlyEqual(t, length2, 5.00000, EPS)

  const vec3 = fromValues(1, -2)
  const length3 = squaredLength(vec3)
  nearlyEqual(t, length3, 5.00000, EPS)

  const vec4 = fromValues(-1, -2)
  const length4 = squaredLength(vec4)
  nearlyEqual(t, length4, 5.00000, EPS)

  const vec5 = fromValues(-1, 2)
  const length5 = squaredLength(vec5)
  nearlyEqual(t, length5, 5.00000, EPS)

  t.true(true)
})
