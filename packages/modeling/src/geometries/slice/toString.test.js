import test from 'ava'

import { create, toString } from './index.js'

test('toString: serialize empty slice into a string', (t) => {
  const geometry = create()
  const result = toString(geometry)
  const expected = 'slice (0 contours):\n[\n]\n'
  t.is(result, expected)
})

test('toString: serialize slice into a string', (t) => {
  const geometry = create([[[0, 0, 3], [0, 1, 3], [2, 0, 3]]])
  const result = toString(geometry)
  const expected = 'slice (1 contours):\n[\n  [[0.0000000, 0.0000000, 3.0000000],[0.0000000, 1.0000000, 3.0000000],[2.0000000, 0.0000000, 3.0000000]],\n]\n'
  t.is(result, expected)
})
