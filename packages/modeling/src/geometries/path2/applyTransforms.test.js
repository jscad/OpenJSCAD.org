const test = require('ava')

const { fromPoints } = require('./index')

const applyTransforms = require('./applyTransforms')

const { comparePoints, compareVectors } = require('../../../test/helpers/')

test('applyTransforms: Updates a populated path with transformed points', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    points: [[0, 0], [1, 0], [0, 1]],
    isClosed: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints({}, points)
  const updated = applyTransforms(geometry)
  t.is(geometry, updated)
  t.true(comparePoints(updated.points, expected.points))
  t.false(updated.isClosed)
  t.true(compareVectors(updated.transforms, expected.transforms))

  const updated2 = applyTransforms(updated)
  t.is(updated, updated2)
  t.true(comparePoints(updated2.points, expected.points))
  t.false(updated2.isClosed)
  t.true(compareVectors(updated2.transforms, expected.transforms))
})
