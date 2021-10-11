const test = require('ava')

const { clone, create, fromPoints } = require('./index')

const { comparePolygons, compareVectors } = require('../../../test/helpers/')

test('clone: Creates a clone on an empty geom3', (t) => {
  const expected = {
    polygons: [],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = create()
  const another = clone(geometry)
  t.not(another, geometry)
  t.deepEqual(another, expected)
})

test('clone: Creates a clone of a populated geom3', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const expected = {
    polygons: [
      { vertices: [[0, 0, 0], [1, 0, 0], [1, 0, 1]] }
    ],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  const another = clone(geometry)
  t.not(another, geometry)
  t.true(comparePolygons(another.polygons[0], expected.polygons[0]))
  t.true(compareVectors(another.transforms, expected.transforms))
})
