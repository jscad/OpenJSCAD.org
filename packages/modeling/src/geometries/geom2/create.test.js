import test from 'ava'

import { create } from './index.js'

test('create: Creates an empty geom2', (t) => {
  const expected = {
    sides: [],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(), expected)
})

test('create: Creates a populated geom2', (t) => {
  const sides = [[[0, 0], [1, 1]]]
  const expected = {
    sides: sides,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(sides), expected)
})
