const test = require('ava')

const { fromPoints } = require('./index')

const applyTransforms = require('./applyTransforms')

test('applyTransforms: returns transformed sides of a geometry', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = [[[0, 1], [0, 0]], [[0, 0], [1, 0]], [[1, 0], [0, 1]]]

  const geometry = fromPoints(points)
  const updatedSides = applyTransforms(geometry)
  t.deepEqual(updatedSides, expected)

})
