import test from 'ava'

import { fromPoints } from './index.js'

import applyTransforms from './applyTransforms.js'

test('applyTransforms: Updates a populated geom2 with transforms', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    outlines: [[[0, 0], [1, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  const updated = applyTransforms(geometry)
  t.is(geometry, updated)
  t.deepEqual(updated, expected)

  const updated2 = applyTransforms(updated)
  t.is(updated, updated2)
  t.deepEqual(updated, expected)
})
