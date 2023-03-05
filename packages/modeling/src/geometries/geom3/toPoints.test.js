import test from 'ava'

import { toPoints, fromPoints, toString } from './index.js'

import { comparePolygonsAsPoints } from '../../../test/helpers/index.js'

test('toPoints: Creates an array of points from a populated geom3', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const geometry = fromPoints(points)

  toString(geometry)

  const expected = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const pointArray = toPoints(geometry)
  t.deepEqual(pointArray, expected)
  t.true(comparePolygonsAsPoints(pointArray, expected))

  toString(geometry)
})
