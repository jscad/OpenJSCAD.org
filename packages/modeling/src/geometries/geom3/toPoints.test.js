import test from 'ava'

import { toPoints, fromPoints, toString } from './index.js'

import { comparePolygonsAsPoints } from '../../../test/helpers/index.js'

test('toPoints: Creates an array of vertices from a populated geom3', (t) => {
  const vertices = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const geometry = fromPoints(vertices)

  toString(geometry)

  const expected = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const vertexList = toPoints(geometry)
  t.deepEqual(vertexList, expected)
  t.true(comparePolygonsAsPoints(vertexList, expected))

  toString(geometry)
})
