const test = require('ava')

const { clone, create, fromPoints } = require('./index')

test('clone: Creates a clone on an empty geom2', (t) => {
  const expected = {
    sides: [],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = create()
  const another = clone(geometry)
  t.not(another, geometry)
  t.deepEqual(another, expected)
})

test('clone: Creates a clone of a complete geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    sides: [[[0, 1], [0, 0]], [[0, 0], [1, 0]], [[1, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  const another = clone(geometry)
  t.not(another, geometry)
  t.deepEqual(another, expected)
})
