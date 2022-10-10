import test from 'ava'

import { TAU } from '../constants.js'

import { fromAngleRadians, create } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec2: fromAngleRadians() should return a new vec2 with correct values', (t) => {
  const obs1 = fromAngleRadians(create(), 0)
  t.true(compareVectors(obs1, [1.0, 0.0]))

  const obs2 = fromAngleRadians(obs1, TAU / 2)
  t.true(compareVectors(obs2, [-1, 1.2246468525851679e-16]))
})
