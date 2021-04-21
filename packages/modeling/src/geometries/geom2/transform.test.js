const test = require('ava')

const mat4 = require('../../maths/mat4')

const { transform, fromPoints, toSides } = require('./index')

const { comparePoints, compareVectors } = require('../../../test/helpers/')

test('transform: adjusts the transforms of geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const rotation = 90 * 0.017453292519943295
  const rotate90 = mat4.fromZRotation(mat4.create(), rotation)

  // continue with typical user scenario, several itterations of transforms and access

  // expect lazy transform, i.e. only the transforms change
  const expected = {
    sides: [[[0, 1], [0, 0]], [[0, 0], [1, 0]], [[1, 0], [0, 1]]],
    transforms: [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  let another = transform(rotate90, geometry)
  t.not(geometry, another)
  t.true(comparePoints(another.sides[0], expected.sides[0]))
  t.true(comparePoints(another.sides[1], expected.sides[1]))
  t.true(comparePoints(another.sides[2], expected.sides[2]))
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1]
  another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another)
  t.true(comparePoints(another.sides[0], expected.sides[0]))
  t.true(comparePoints(another.sides[1], expected.sides[1]))
  t.true(comparePoints(another.sides[2], expected.sides[2]))
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect application of the transforms to the sides
  expected.sides = [[[4, 10], [5, 10]], [[5, 10], [5, 11]], [[5, 11], [4, 10]]]
  expected.transforms = mat4.create()
  toSides(another)
  t.true(comparePoints(another.sides[0], expected.sides[0]))
  t.true(comparePoints(another.sides[1], expected.sides[1]))
  t.true(comparePoints(another.sides[2], expected.sides[2]))
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1]
  another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another)
  t.true(comparePoints(another.sides[0], expected.sides[0]))
  t.true(comparePoints(another.sides[1], expected.sides[1]))
  t.true(comparePoints(another.sides[2], expected.sides[2]))
  t.true(compareVectors(another.transforms, expected.transforms))
})
