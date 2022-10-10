import test from 'ava'

import { clone, fromValues } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec2: clone() should return a new vec2 with same values', (t) => {
  const org1 = fromValues(0, 0)
  const obs1 = clone(org1)
  t.true(compareVectors(obs1, [0, 0]))
  t.not(obs1, org1)

  const org2 = fromValues(1, 2)
  const obs2 = clone(org2)
  t.true(compareVectors(obs2, [1, 2]))
  t.not(obs2, org2)

  const org3 = fromValues(-1, -2)
  const obs3 = clone(org3)
  t.true(compareVectors(obs3, [-1, -2]))
  t.not(obs3, org3)
})
