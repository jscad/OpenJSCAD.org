import test from 'ava'

import { create } from './index.js'

test('poly3: create() should return a poly3 with initial values', (t) => {
  const obs = create()
  const exp = { vertices: [] }
  t.deepEqual(obs, exp)
})
