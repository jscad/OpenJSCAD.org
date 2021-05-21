import test from 'ava'

import { fromPoints } from './index'

import { comparePolygons, compareVectors } from '../../../test/helpers/'

import Vec3 from '../../maths/vec3/type'

test('fromPoints: Creates a populated geom3', (t) => {
  const points: Array<Array<Vec3>> = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
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
