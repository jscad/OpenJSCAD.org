import test from 'ava'

import { invert, create, fromPoints } from './index'

import { comparePolygons, compareVectors } from '../../../test/helpers/'

import Vec3 from '../../maths/vec3/type'

test('invert: Creates a invert on an empty geom3', (t) => {
  const expected = {
    polygons: [],
    isRetesselated: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = create()
  const another = invert(geometry)
  t.not(another, geometry)
  t.deepEqual(another, expected)
})

test('invert: Creates a invert of a populated geom3', (t) => {
  const points: Array<Array<Vec3>> = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const expected = {
    polygons: [
      { vertices: [[1, 0, 1], [1, 0, 0], [0, 0, 0]] }
    ],
    isRetesselated: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const geometry = fromPoints(points)
  const another = invert(geometry)
  t.not(another, geometry)
  t.true(comparePolygons(another.polygons[0], expected.polygons[0]))
  t.true(compareVectors(another.transforms, expected.transforms))
})
