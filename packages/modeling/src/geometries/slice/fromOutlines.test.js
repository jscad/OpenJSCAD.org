import test from 'ava'

import { fromOutlines } from './index.js'

test('slice: fromOutlines() should return a new slice with correct values', (t) => {
  const exp1 = {
    contours: [
      [[0, 0, 0], [1, 0, 0], [1, 1, 0]],
      [[2, 2, 0], [3, 1, 0], [3, 3, 0]]
    ]
  }
  const obs1 = fromOutlines([
    [[0, 0], [1, 0], [1, 1]],
    [[2, 2], [3, 1], [3, 3]]
  ])
  t.deepEqual(obs1, exp1)
})
