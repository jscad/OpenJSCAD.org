import test from 'ava'

import { create } from './index.js'

test('slice: create() should return a slice with initial values', (t) => {
  const obs = create()
  const exp = { parts: [] }
  t.deepEqual(obs, exp)
})
