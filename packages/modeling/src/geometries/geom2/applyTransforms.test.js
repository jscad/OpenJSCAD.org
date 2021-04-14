const test = require('ava')

const { fromPoints } = require('./index')

const applyTransforms = require('./applyTransforms')

test('applyTransforms: Updates a populated geom2 with transformed sides', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    sides: [[[0, 1], [0, 0]], [[0, 0], [1, 0]], [[1, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  const updated = applyTransforms(geometry)
  t.is(geometry, updated)
  t.deepEqual(updated, expected)

  const updated2 = applyTransforms(updated)
  t.is(updated, updated2)
  t.deepEqual(updated, expected)
})
