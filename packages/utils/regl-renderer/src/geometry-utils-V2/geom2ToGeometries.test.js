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

test('geom2ToGeometries (solid with sides)', (t) => {
  const solid = {
    sides: [[[0, 0], [1, 0]], [[1, 0], [1, 1]], [[1, 1], [0, 0]]]
  }
  const expected = [{
    color: [1, 2, 3, 0.8],
    colors: [],
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

test('geom2ToGeometries (solid with > 65000 sides)', (t) => {
  const solid = { sides: [] }
  for (let i = 0; i < 70000; i++) {
    solid.sides.push([[i, i], [i + 1, i + 1]])
  }
  const start = solid.sides[0]
  const end = solid.sides[solid.sides.length - 1]
  solid.sides.push([end[1], start[0]])

  const geometries = geom2ToGeometries({ color: [1, 2, 3, 0.8] }, solid)
  t.is(geometries.length, 3)
})
