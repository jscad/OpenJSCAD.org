import test from 'ava'

import { geom2ToGeometries } from './geom2ToGeometries.js'

const defaultTransforms = Float32Array.from([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
])

test('geom2ToGeometries (empty solid)', (t) => {
  const solid = {
    outlines: [],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const expected = []
  let geometries = geom2ToGeometries({ color: [1, 2, 3, 4] }, solid)
  t.deepEqual(geometries, expected)

  // with color
  solid.color = [4, 3, 2, 1]
  geometries = geom2ToGeometries({ color: [1, 2, 3, 4] }, solid)
  t.deepEqual(geometries, expected)

  // with transforms
  solid.transforms = [
    5, 0, 0, 0,
    0, 4, 0, 0,
    0, 0, 3, 0,
    0, 0, 0, 2
  ]
  geometries = geom2ToGeometries({ color: [1, 2, 3, 4] }, solid)
  t.deepEqual(geometries, expected)
})

test('geom2ToGeometries (solid with outlines)', (t) => {
  const solid = {
    outlines: [
      [[0, 0], [1, 0], [1, 1]]
    ],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  const expected = [{
    color: [1, 2, 3, 0.8],
    indices: [0, 1, 2, 3, 4, 5],
    normals: [[0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]],
    positions: [[0, 0, 0], [1, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 0], [0, 0, 0]],
    transforms: defaultTransforms,
    isTransparent: true,
    type: '2d'
  }]
  const geometries = geom2ToGeometries({ color: [1, 2, 3, 0.8] }, solid)
  t.deepEqual(geometries, expected)
})

test('geom2ToGeometries (solid with > 65000 outlines)', (t) => {
  const outline = []
  for (let i = 0; i < 70000; i++) {
    outline.push([i, i])
  }
  const solid = {
    outlines: [outline],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }

  const geometries = geom2ToGeometries({ color: [1, 2, 3, 0.8] }, solid)
  t.is(geometries.length, 3)
})
