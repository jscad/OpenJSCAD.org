const test = require('ava')

const { reverse, fromPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/')

test('reverse: Reverses a populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    sides: [[[0, 1], [1, 0]], [[1, 0], [0, 0]], [[0, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  const another = reverse(geometry)
  t.not(geometry, another)
  t.true(compareVectors(another.sides, expected.sides))
  t.true(compareVectors(another.transforms, expected.transforms))
})
