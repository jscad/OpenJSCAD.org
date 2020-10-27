const test = require('ava')

const path2ToGeometries = require('./path2ToGeometries')

const defaultTransforms = Float32Array.from([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
])

test('path2ToGeometries (empty solid)', (t) => {
  const solid = {
    points: []
  }
  let expected = [{ color: [1, 2, 3, 4], indices: [], normals: [], positions: [], transforms: defaultTransforms, isTransparent: false }]
  let geometries = path2ToGeometries({ color: [1, 2, 3, 4] }, solid)
  t.deepEqual(geometries, expected)

  // with color
  solid.color = [4, 3, 2, 1]
  expected = [{ color: [4, 3, 2, 1], indices: [], normals: [], positions: [], transforms: defaultTransforms, isTransparent: false }]
  geometries = path2ToGeometries({ color: [1, 2, 3, 4] }, solid)
  t.deepEqual(geometries, expected)

  // with transforms
  solid.transforms = [
    5, 0, 0, 0,
    0, 4, 0, 0,
    0, 0, 3, 0,
    0, 0, 0, 2
  ]
  expected = [{
    color: [4, 3, 2, 1],
    indices: [],
    normals: [],
    positions: [],
    transforms: Float32Array.from(solid.transforms),
    isTransparent: false
  }]
  geometries = path2ToGeometries({ color: [1, 2, 3, 4] }, solid)
  t.deepEqual(geometries, expected)
})

test('path2ToGeometries (solid with points)', (t) => {
  const solid = {
    points: [[0, 0], [1, 0], [1, 1]]
  }
  const expected = [{
    color: [1, 2, 3, 0.8],
    indices: [0, 1, 2, 3],
    normals: [[0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]],
    positions: [[0, 0, 0], [1, 0, 0], [1, 0, 0], [1, 1, 0]],
    transforms: defaultTransforms,
    isTransparent: true
  }]
  const geometries = path2ToGeometries({ color: [1, 2, 3, 0.8] }, solid)
  t.deepEqual(geometries, expected)
})

// TODO: test SUPER LARGE solid with > 65000 points
