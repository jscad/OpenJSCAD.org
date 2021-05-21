import test from 'ava'

import { create } from './index'

import { compareVectors } from '../../../test/helpers/index'

test('vec4: create() should return a vec4 with initial values', (t) => {
  const obs = create()
  t.true(compareVectors(obs, [0, 0, 0, 0]))
})
