import test from 'ava'

import { clone, create, fromPoints } from './index'

import { comparePolygons, compareVectors } from '../../../test/helpers/'

import Vec3 from '../../maths/vec3/type'

test('clone: Creates a clone on an empty geom3', (t) => {
  const expected = {
    polygons: [],
    isRetesselated: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = create()
  const another = clone(geometry)
  t.not(another, geometry)
  t.deepEqual(another, expected)
})

test('clone: Creates a clone of a populated geom3', (t) => {
  const points: Array<Array<Vec3>> = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const expected = {
    polygons: [
      { vertices: [[0, 0, 0], [1, 0, 0], [1, 0, 1]] }
    ],
    isRetesselated: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  const another = clone(geometry)
  t.not(another, geometry)
  t.true(comparePolygons(another.polygons[0], expected.polygons[0]))
  t.true(compareVectors(another.transforms, expected.transforms))
})
