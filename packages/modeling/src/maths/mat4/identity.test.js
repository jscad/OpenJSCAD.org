import test from 'ava'

import { identity } from './index.js'

import { compareVectors } from '../../../test/helpers/index.js'

test('mat4: identity() called with one parameters should update a mat4 with correct values', (t) => {
  const obs1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  const ret1 = identity(obs1)
  t.true(compareVectors(obs1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.true(compareVectors(ret1, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))
  t.is(obs1, ret1)
})
