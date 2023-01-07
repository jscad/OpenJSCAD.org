import test from 'ava'

import { create, reverse } from './index.js'

import { comparePoints, compareVectors } from '../../../test/helpers/index.js'

test('reverse: Reverses a populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    outlines: [[[0, 1], [1, 0], [0, 0]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = create([points])
  const another = reverse(geometry)
  t.not(geometry, another)
  t.true(comparePoints(another.outlines[0], expected.outlines[0]))
  t.true(compareVectors(another.transforms, expected.transforms))
})
