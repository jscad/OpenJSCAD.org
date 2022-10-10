import test from 'ava'

import { TAU } from '../constants.js'

import { rotate, fromValues } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec2: rotate() called with three parameters should update a vec2 with correct values', (t) => {
  const radians = TAU / 4

  const obs1 = fromValues(0, 0)
  const ret1 = rotate(obs1, [0, 0], [0, 0], 0)
  t.true(compareVectors(obs1, [0, 0]))
  t.true(compareVectors(ret1, [0, 0]))

  const obs2 = fromValues(0, 0)
  const ret2 = rotate(obs2, [1, 2], [0, 0], 0)
  t.true(compareVectors(obs2, [1, 2]))
  t.true(compareVectors(ret2, [1, 2]))

  const obs3 = fromValues(0, 0)
  const ret3 = rotate(obs3, [-1, -2], [0, 0], radians)
  t.true(compareVectors(obs3, [2, -1], 1e-15))
  t.true(compareVectors(ret3, [2, -1], 1e-15))

  const obs4 = fromValues(0, 0)
  const ret4 = rotate(obs4, [-1, 2], [-3, -3], -radians)
  t.true(compareVectors(obs4, [2, -5], 1e-15))
  t.true(compareVectors(ret4, [2, -5], 1e-15))
})
