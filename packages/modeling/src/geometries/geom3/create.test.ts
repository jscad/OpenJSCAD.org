import test from 'ava'

import poly3 from '../poly3'

import { create } from './index'

import Vec3 from '../../maths/vec3/type'

test('create: Creates an empty geom3', (t) => {
  const expected = {
    polygons: [],
    isRetesselated: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(), expected)
})

test('create: Creates a populated geom3', (t) => {
  const points: Array<Vec3> = [[0, 0, 0], [0, 10, 0], [0, 10, 10]]
  const polygon = poly3.fromPoints(points)

  const polygons = [polygon]
  const expected = {
    polygons: polygons,
    isRetesselated: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(polygons), expected)
})
