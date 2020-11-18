const test = require('ava')

const geom2ToGeometries = require('./geom2ToGeometries')

const defaultTransforms = Float32Array.from([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
])

test('geom2ToGeometries (empty solid)', (t) => {
  const solid = {
    sides: []
  }
  let expected = [{ color: [1, 2, 3, 4], indices: [], normals: [], positions: [], transforms: defaultTransforms, isTransparent: false }]
  let geometries = geom2ToGeometries({ color: [1, 2, 3, 4] }, solid)
  t.deepEqual(geometries, expected)

  // with color
  solid.color = [4, 3, 2, 1]
  expected = [{ color: [4, 3, 2, 1], indices: [], normals: [], positions: [], transforms: defaultTransforms, isTransparent: false }]
  geometries = geom2ToGeometries({ color: [1, 2, 3, 4] }, solid)
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
  geometries = geom2ToGeometries({ color: [1, 2, 3, 4] }, solid)
  t.deepEqual(geometries, expected)
})

test('geom2ToGeometries (solid with sides)', (t) => {
  const solid = {
    sides: [[[0, 0], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [0, 0]]]
  }
  const expected = [{
    color: [1, 2, 3, 0.8],
    indices: [0, 1, 2, 3, 4, 5],
    normals: [[0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]],
    positions: [[0, 0, 0], [1, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 0], [0, 0, 0]],
    transforms: defaultTransforms,
    isTransparent: true
  }]
  const geometries = geom2ToGeometries({ color: [1, 2, 3, 0.8] }, solid)
  t.deepEqual(geometries, expected)
})

// TODO: test SUPER LARGE solid with > 65000 points
