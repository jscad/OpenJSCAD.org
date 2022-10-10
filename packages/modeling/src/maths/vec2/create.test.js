import test from 'ava'

import { create } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('vec2: create() should return a vec2 with initial values', (t) => {
  const obs = create()
  t.true(compareVectors(obs, [0, 0]))
})
