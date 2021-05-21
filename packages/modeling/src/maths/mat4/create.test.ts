import test from 'ava'

import { create } from './index'

import { compareVectors } from '../../../test/helpers/index'

test('mat4: create() should return a mat4 with initial values', (t) => {
  const obs = create() // identity matrix
  t.true(compareVectors(obs, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
})
