import test from 'ava'

import { clone, create } from './index.js'

test('clone: Creates a clone on an empty geom2', (t) => {
  const expected = {
    outlines: [],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = create()
  const another = clone(geometry)
  t.not(another, geometry)
  t.deepEqual(another, expected)
})

test('clone: Creates a clone of a complete geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    outlines: [[[0, 0], [1, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = create([points])
  const another = clone(geometry)
  t.not(another, geometry)
  t.deepEqual(another, expected)
})
