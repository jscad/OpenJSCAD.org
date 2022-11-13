import test from 'ava'

import { fromVec2, create } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec3: fromVec2() should return a new vec3 with correct values', (t) => {
  const obs1 = fromVec2(create(), [0, 0])
  t.true(compareVectors(obs1, [0, 0, 0]))

  const obs2 = fromVec2(obs1, [0, 1], -5)
  t.true(compareVectors(obs2, [0, 1, -5]))
})
