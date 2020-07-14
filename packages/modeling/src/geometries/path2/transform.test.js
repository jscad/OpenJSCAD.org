const test = require('ava')

const mat4 = require('../../maths/mat4')

const { transform, fromPoints, toPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/')

test('transform: adjusts the transforms of path', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const rotation = 90 * 0.017453292519943295
  const rotate90 = mat4.fromZRotation(rotation)

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
  t.true(compareVectors(another.points, expected.points))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, -5, 5, 5, 1]
  another = transform(mat4.fromTranslation([5, 5, 5]), another)
  t.true(compareVectors(another.points, expected.points))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect application of the transforms to the sides
  expected.points = [[-5, 5], [-5, 6], [-6, 5]]
  expected.transforms = mat4.identity()
  toPoints(another)
  t.true(compareVectors(another.points, expected.points))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 5, 5, 1]
  another = transform(mat4.fromTranslation([5, 5, 5]), another)
  t.true(compareVectors(another.points, expected.points))
  t.false(another.isClosed)
  t.true(compareVectors(another.transforms, expected.transforms))
})
