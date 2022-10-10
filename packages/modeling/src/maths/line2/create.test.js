import test from 'ava'

import { create } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('line2: create() should return a line2 with initial values', (t) => {
  const obs = create()
  t.true(compareVectors(obs, [0, 1, 0]))
})
