import test from 'ava'

import { toVertices, fromVertices, toString } from './index.js'

import { comparePolygonsAsPoints } from '../../../test/helpers/index.js'

test('toVertices: Creates an array of vertices from a populated geom3', (t) => {
  const vertices = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const geometry = fromVertices(vertices)

  toString(geometry)

  const expected = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const vertexList = toVertices(geometry)
  t.deepEqual(vertexList, expected)
  t.true(comparePolygonsAsPoints(vertexList, expected))

  toString(geometry)
})
