const test = require('ava')

const { fromPoints } = require('./index')

const applyTransforms = require('./applyTransforms')

const { comparePolygons, compareVectors } = require('../../../test/helpers/')

test('applyTransforms: Updates a geom3 with transformed polygons', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const expected = {
    polygons: [
      { vertices: [[0, 0, 0], [1, 0, 0], [1, 0, 1]] }
    ],
    isRetesselated: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  const updated = applyTransforms(geometry)
  t.is(geometry, updated)
  t.true(comparePolygons(updated.polygons[0], expected.polygons[0]))
  t.true(compareVectors(updated.transforms, expected.transforms))

  const updated2 = applyTransforms(updated)
  t.is(updated, updated2)
  t.true(comparePolygons(updated2.polygons[0], expected.polygons[0]))
  t.true(compareVectors(updated2.transforms, expected.transforms))
})
