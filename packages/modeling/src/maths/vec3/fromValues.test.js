import test from 'ava'

import { fromValues } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec3: fromValues() should return a new vec3 with correct values', (t) => {
  const obs1 = fromValues(0, 0, 0)
  t.true(compareVectors(obs1, [0, 0, 0]))

  const obs2 = fromValues(0, 1, -5)
  t.true(compareVectors(obs2, [0, 1, -5]))
})
