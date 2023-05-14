import test from 'ava'

import { poly3 } from '../index.js'

import { create } from './index.js'

test('create: Creates an empty geom3', (t) => {
  const expected = {
    polygons: [],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(), expected)
})

test('create: Creates a populated geom3', (t) => {
  const vertices = [[0, 0, 0], [0, 10, 0], [0, 10, 10]]
  const polygon = poly3.create(vertices)

  const polygons = [polygon]
  const expected = {
    polygons: polygons,
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(create(polygons), expected)
})
