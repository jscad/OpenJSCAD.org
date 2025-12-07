import test from 'ava'

import { mat4 } from '../../maths/index.js'

import { transform, fromVertices, toVertices } from './index.js'

import { comparePoints, compareVectors } from '../../../test/helpers/index.js'

test('transform: adjusts the transforms of path', (t) => {
  const vertices = [[0, 0, 0], [1, 0, 0], [0, 1, 0]]
  const rotation = 90 * 0.017453292519943295
  const rotate90 = mat4.fromZRotation(mat4.create(), rotation)

  // continue with typical user scenario, several iterations of transforms and access

  // expect lazy transform, i.e. only the transforms change
  const expected = {
    vertices: [[0, 0, 0], [1, 0, 0], [0, 1, 0]],
    isClosed: false,
    transforms: [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromVertices({}, vertices)
  let another = transform(rotate90, geometry)
  t.not(geometry, another)
  t.true(comparePoints(another.vertices, expected.vertices))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1]
  another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another)
  t.true(comparePoints(another.vertices, expected.vertices))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect application of the transforms to the vertices
  expected.vertices = [[5, 10, 15], [5, 11, 15], [4, 10, 15]]
  expected.transforms = mat4.create()
  toVertices(another)
  t.true(comparePoints(another.vertices, expected.vertices))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1]
  another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another)
  t.true(comparePoints(another.vertices, expected.vertices))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))
})
