const test = require('ava')

const poly3 = require('../poly3')

const { create } = require('./index')

test('create: Creates an empty geom3', (t) => {
  const expected = {
    polygons: [],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(), expected)
})

test('create: Creates a populated geom3', (t) => {
  const points = [[0, 0, 0], [0, 10, 0], [0, 10, 10]]
  const polygon = poly3.create(points)

  const polygons = [polygon]
  const expected = {
    polygons: polygons,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(polygons), expected)
})
