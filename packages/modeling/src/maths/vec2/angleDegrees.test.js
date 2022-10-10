import test from 'ava'

import { EPS } from '../constants.js'

import { angleDegrees } from './index.js'

import { nearlyEqual } from '../../../test/helpers/index.js'

test('vec2: angleDegrees() should return correct values', (t) => {
  const distance1 = angleDegrees([0, 0])
  nearlyEqual(t, distance1, 0.0, EPS)

  const distance2 = angleDegrees([1, 2])
  nearlyEqual(t, distance2, 63.4349488, EPS)

  const distance3 = angleDegrees([1, -2])
  nearlyEqual(t, distance3, -63.4349488, EPS)

  const distance4 = angleDegrees([-1, -2])
  nearlyEqual(t, distance4, -116.5650511, EPS)

  const distance5 = angleDegrees([-1, 2])
  nearlyEqual(t, distance5, 116.5650511, EPS)

  t.true(true)
})
