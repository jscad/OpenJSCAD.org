const test = require('ava')

const mat4 = require('../../maths/mat4')

const { transform, fromPoints, toPolygons } = require('./index')

const { comparePolygons, compareVectors } = require('../../../test/helpers/')

test('transform: Adjusts the transforms of a populated geom3', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const rotation = 90 * 0.017453292519943295
  const rotate90 = mat4.fromZRotation(mat4.create(), rotation)

  // continue with typical user scenario, several iterations of transforms and access

  // expect lazy transform, i.e. only the transforms change
  const expected = {
    polygons: [
      { vertices: [[0, 0, 0], [1, 0, 0], [1, 0, 1]] }
    ],
    transforms: [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  let another = transform(rotate90, geometry)
  t.not(geometry, another)
  t.true(comparePolygons(another.polygons[0], expected.polygons[0]))
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [6.123234262925839e-17, 1, 0, 0, -1, 6.123234262925839e-17, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1]
  another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another)
  t.true(comparePolygons(another.polygons[0], expected.polygons[0]))
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect application of the transforms to the polygons
  expected.polygons = [
    { vertices: [[5, 10, 15], [5, 11, 15], [5, 11, 16]] }
  ]
  expected.transforms = mat4.create()
  toPolygons(another)
  t.true(comparePolygons(another.polygons[0], expected.polygons[0]))
  t.true(compareVectors(another.transforms, expected.transforms))

  // expect lazy transform, i.e. only the transforms change
  expected.transforms = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 10, 15, 1]
  another = transform(mat4.fromTranslation(mat4.create(), [5, 10, 15]), another)
  t.true(comparePolygons(another.polygons[0], expected.polygons[0]))
  t.true(compareVectors(another.transforms, expected.transforms))
})
