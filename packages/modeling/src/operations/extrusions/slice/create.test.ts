import test from 'ava'

import { create } from './index'

test('slice: create() should return a slice with initial values', (t) => {
  const obs = create()
  const exp = { edges: [] }
  t.deepEqual(obs, exp)
})
