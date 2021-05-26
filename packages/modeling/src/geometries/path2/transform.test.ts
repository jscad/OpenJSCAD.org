import test from 'ava'

import mat4 from '../../maths/mat4'

import { transform, fromPoints, toPoints } from './index'

import { comparePoints, compareVectors } from '../../../test/helpers/'

import Vec2 from '../../maths/vec2/type'

test('transform: adjusts the transforms of path', (t) => {
  const points: Array<Vec2> = [[0, 0], [1, 0], [0, 1]]
  const rotation = 90 * 0.017453292519943295
  const rotate90 = mat4.fromZRotation(mat4.create(), rotation)

  // continue with typical user scenario, several itterations of transforms and access

  // expect lazy transform, i.e. only the transforms change
  const expected = {
    points: [[0, 0], [1, 0], [0, 1]],
    isClosed: false,
    transforms: [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints({}, points)
  let another = transform(rotate90, geometry)
  t.not(geometry, another)
  t.true(comparePoints(another.points, expected.points))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1]
  another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another)
  t.true(comparePoints(another.points, expected.points))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect application of the transforms to the sides
  expected.points = [[5, 10], [5, 11], [4, 10]]
  expected.transforms = mat4.create()
  toPoints(another)
  t.true(comparePoints(another.points, expected.points))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1]
  another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another)
  t.true(comparePoints(another.points, expected.points))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))
})
