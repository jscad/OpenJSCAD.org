import test from 'ava'

import { fromVertices } from './index.js'

test('slice: fromVertices() should return a new slice with correct values', (t) => {
  const exp1 = {
    contours: [[[0, 0, 0], [1, 0, 0], [1, 1, 0]]]
  }
  const obs1 = fromVertices([[0, 0], [1, 0], [1, 1]])
  t.deepEqual(obs1, exp1)
})
