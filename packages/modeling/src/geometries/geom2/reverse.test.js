const test = require('ava')

const { reverse, fromPoints } = require('./index')

const { comparePoints, compareVectors } = require('../../../test/helpers/')

test('reverse: Reverses a populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    sides: [[[0, 1], [1, 0]], [[1, 0], [0, 0]], [[0, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  const another = reverse(geometry)
  t.not(geometry, another)
  t.true(comparePoints(another.sides[0], expected.sides[0]))
  t.true(comparePoints(another.sides[1], expected.sides[1]))
  t.true(comparePoints(another.sides[2], expected.sides[2]))
  t.true(compareVectors(another.transforms, expected.transforms))
})
