import test from 'ava'

import { create } from './index.js'

test('poly2: create() should return a poly2 with initial values', (t) => {
  let obs = create()
  let exp = { points: [] }
  t.deepEqual(obs, exp)

  obs = create([[1, 1], [2, 2], [3, 3]])
  exp = { points: [[1, 1], [2, 2], [3, 3]] }
  t.deepEqual(obs, exp)
})
