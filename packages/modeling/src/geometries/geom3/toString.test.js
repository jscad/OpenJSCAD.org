import test from 'ava'

import { create, fromVertices, toString } from './index.js'

test('toString: serialize empty geom3 into a string', (t) => {
  const geometry = create()
  const result = toString(geometry)
  const expected = 'geom3 (0 polygons):\n'
  t.is(result, expected)
})

test('toString: serialize geom3 into a string', (t) => {
  const geometry = fromVertices([[[0, 0, 3], [0, 1, 3], [2, 0, 3]]])
  const result = toString(geometry)
  const expected = 'geom3 (1 polygons):\n  poly3: [[0.0000000, 0.0000000, 3.0000000], [0.0000000, 1.0000000, 3.0000000], [2.0000000, 0.0000000, 3.0000000]]\n'
  t.is(result, expected)
})
