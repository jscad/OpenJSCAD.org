const test = require('ava')

const { compareVectors } = require('../../../test/helpers/index')

const { projectionOfPoint, create, fromNormalAndPoint } = require('./index')

test('plane: projectionOfPoint() should return correct values', (t) => {
  const temp = create()

  const plane1 = fromNormalAndPoint(temp, [0, 0, 0], [0, 0, 0])
  const point1 = projectionOfPoint(plane1, [0, 0, 0])
  t.deepEqual(point1, [0, 0, 0])

  // axis aligned planes
  const plane2 = fromNormalAndPoint(temp, [0, 0, 1], [0, 0, 0])
  const point2 = projectionOfPoint(plane2, [1, 1, 1])
  t.deepEqual(point2, [1, 1, 0])

  const plane3 = fromNormalAndPoint(temp, [1, 0, 0], [0, 0, 0])
  const point3 = projectionOfPoint(plane3, [1, 1, 1])
  t.deepEqual(point3, [0, 1, 1])

  const plane4 = fromNormalAndPoint(temp, [0, 1, 0], [0, 0, 0])
  const point4 = projectionOfPoint(plane4, [1, 1, 1])
  t.deepEqual(point4, [1, 0, 1])

  // diagonal planes
  const plane5 = fromNormalAndPoint(temp, [1, 1, 1], [0, 0, 0])
  const point5 = projectionOfPoint(plane5, [0, 0, 0])
  t.deepEqual(point5, [0, 0, 0])

  const plane6 = fromNormalAndPoint(temp, [1, 1, 1], [0, 0, 0])
  const point6 = projectionOfPoint(plane6, [3, 3, 3])
  t.true(compareVectors(point6, [0, 0, 0]))

  const plane7 = fromNormalAndPoint(temp, [1, 1, 1], [0, 0, 0])
  const point7 = projectionOfPoint(plane7, [-3, -3, -3])
  t.true(compareVectors(point7, [0, 0, 0]))

  const plane8 = fromNormalAndPoint(temp, [1, 1, 1], [0, 0, 0])
  const point8 = projectionOfPoint(plane8, [0, 0, 0])
  t.true(compareVectors(point8, [0, 0, 0]))
})
