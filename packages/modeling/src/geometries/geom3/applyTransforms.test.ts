import test from 'ava'

import { fromPoints } from './index'

import applyTransforms from './applyTransforms'

import { comparePolygons, compareVectors } from '../../../test/helpers/'

import Vec3 from '../../maths/vec3/type'

test('applyTransforms: Updates a geom3 with transformed polygons', (t) => {
  const points: Array<Array<Vec3>> = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
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
