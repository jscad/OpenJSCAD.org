import test from 'ava'

import { fromSides } from './index.js'

test('slice: fromSides() should return a new slice with correct values', (t) => {
  const exp1 = {
    edges: [
      [[0, 0, 0], [1, 0, 0]],
      [[1, 0, 0], [1, 1, 0]],
      [[1, 1, 0], [0, 0, 0]]
    ]
  }
  const obs1 = fromSides([[[0, 0], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [0, 0]]])
  t.deepEqual(obs1, exp1)
})
