const test = require('ava')

const { fromPoints } = require('./index')

const { comparePolygons, compareVectors } = require('../../../test/helpers/')

test('fromPoints: Creates a populated geom3', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const expected = {
    polygons: [
      { vertices: [[0, 0, 0], [1, 0, 0], [1, 0, 1]] }
    ],
    isRetesselated: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const obs = fromPoints(points)
  t.true(comparePolygons(obs.polygons[0], expected.polygons[0]))
  t.true(compareVectors(obs.transforms, expected.transforms))
})

test('fromPoints: throws for improper points', (t) => {
  t.throws(() => fromPoints(), { instanceOf: Error })
  t.throws(() => fromPoints(0, 0, 0), { instanceOf: Error })
})
