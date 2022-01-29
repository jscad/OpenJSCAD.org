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
  const expected = []
  let geometries = path2ToGeometries({ color: [1, 2, 3, 4] }, solid)
  t.deepEqual(geometries, expected)

  // with color
  solid.color = [4, 3, 2, 1]
  geometries = path2ToGeometries({ color: [1, 2, 3, 4] }, solid)
  t.deepEqual(geometries, expected)

  // with transforms
  solid.transforms = [
    5, 0, 0, 0,
    0, 4, 0, 0,
    0, 0, 3, 0,
    0, 0, 0, 2
  ]
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
    isTransparent: true,
    type: '2d'
  }]
  const geometries = path2ToGeometries({ color: [1, 2, 3, 0.8] }, solid)
  t.deepEqual(geometries, expected)
})

test('path2ToGeometries (solid with > 65000 points)', (t) => {
  const solid = { points: [] }
  for (let i = 0; i < 70000; i++) {
    solid.points.push([i, i])
  }

  const geometries = path2ToGeometries({ color: [1, 2, 3, 0.8] }, solid)
  t.is(geometries.length, 3)
})
