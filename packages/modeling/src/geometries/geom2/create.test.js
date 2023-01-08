import test from 'ava'

import { create } from './index.js'

test('create: Creates an empty geom2', (t) => {
  const expected = {
    outlines: [],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(), expected)
})

test('create: Creates a populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    outlines: [[[0, 0], [1, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create([points]), expected)
})
