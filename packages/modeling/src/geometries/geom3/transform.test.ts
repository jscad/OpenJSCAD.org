import test from 'ava'

import mat4 from '../../maths/mat4'

import { transform, fromPoints, toPolygons } from './index'

import { comparePolygons, compareVectors } from '../../../test/helpers/'

import Vec3 from '../../maths/vec3/type'

test('transform: Adjusts the transforms of a populated geom3', (t) => {
  const points: Array<Array<Vec3>> = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const rotation = 90 * 0.017453292519943295
  const rotate90 = mat4.fromZRotation(mat4.create(), rotation)

  // continue with typical user scenario, several itterations of transforms and access

  // expect lazy transform, i.e. only the transforms change
  const expected = {
    polygons: [
      { vertices: [[0, 0, 0], [1, 0, 0], [1, 0, 1]] }
    ],
    isRetesselated: false,
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