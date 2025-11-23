import test from 'ava'

import { fromVertices } from './index.js'

import { applyTransforms } from './applyTransforms.js'

import { comparePoints, compareVectors } from '../../../test/helpers/index.js'

test('applyTransforms: Updates a populated path with transformed points', (t) => {
  const vertices = [[0, 0, 0], [1, 0, 0], [0, 1, 0]]
  const expected = {
    vertices: [[0, 0, 0], [1, 0, 0], [0, 1, 0]],
    isClosed: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromVertices({}, vertices)
  const updated = applyTransforms(geometry)
  t.is(geometry, updated)
  t.true(comparePoints(updated.vertices, expected.vertices))
  t.false(updated.isClosed)
  t.true(compareVectors(updated.transforms, expected.transforms))

  const updated2 = applyTransforms(updated)
  t.is(updated, updated2)
  t.true(comparePoints(updated2.vertices, expected.vertices))
  t.false(updated2.isClosed)
  t.true(compareVectors(updated2.transforms, expected.transforms))
})
