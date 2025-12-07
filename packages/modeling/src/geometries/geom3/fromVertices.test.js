import test from 'ava'

import { fromVertices } from './index.js'

import { comparePolygons, compareVectors } from '../../../test/helpers/index.js'

test('fromVertices: Creates a populated geom3', (t) => {
  const vertices = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const expected = {
    polygons: [
      { vertices: [[0, 0, 0], [1, 0, 0], [1, 0, 1]] }
    ],
    isRetesselated: false,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const obs = fromVertices(vertices)
  t.true(comparePolygons(obs.polygons[0], expected.polygons[0]))
  t.true(compareVectors(obs.transforms, expected.transforms))
})

test('fromVertices: throws for improper vertices', (t) => {
  t.throws(() => fromVertices(), { instanceOf: Error })
  t.throws(() => fromVertices(0, 0, 0), { instanceOf: Error })
})
