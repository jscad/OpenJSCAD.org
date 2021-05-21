import test from 'ava'

import { toPoints, fromPoints, toString } from './index'

import { comparePolygonsAsPoints } from '../../../test/helpers/'

import Vec3 from '../../maths/vec3/type'

test('toPoints: Creates an array of points from a populated geom3', (t) => {
  const points: Array<Array<Vec3>> = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const geometry = fromPoints(points)

  toString(geometry)

  const expected = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const pointarray = toPoints(geometry)
  t.deepEqual(pointarray, expected)
  t.true(comparePolygonsAsPoints(pointarray, expected))

  toString(geometry)
})
