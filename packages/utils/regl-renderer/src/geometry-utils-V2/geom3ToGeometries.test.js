const test = require('ava')

const geom3ToGeometries = require('./geom3ToGeometries')

const defaultTransforms = Float32Array.from([
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
])

test('geom3ToGeometries (empty solid)', (t) => {
  const solid = {
    polygons: []
  }
  const expected = []
  const options = {
    color: [1, 2, 3, 4],
    normalThreshold: 0.3,
    smoothLighting: true
  }
  const geometries = geom3ToGeometries(options, solid)
  t.deepEqual(geometries, expected)
})

test('geom3ToGeometries (solid with polygons)', (t) => {
  const solid = {
    polygons: [
      { vertices: [[0, 2, 4], [0, 2, 10], [0, 8, 10], [0, 8, 4]] },
      { vertices: [[6, 2, 4], [6, 8, 4], [6, 8, 10], [6, 2, 10]] },
      { vertices: [[0, 2, 4], [6, 2, 4], [6, 2, 10], [0, 2, 10]] },
      { vertices: [[0, 8, 4], [0, 8, 10], [6, 8, 10], [6, 8, 4]] },
      { vertices: [[0, 2, 4], [0, 8, 4], [6, 8, 4], [6, 2, 4]] },
      { vertices: [[0, 2, 10], [6, 2, 10], [6, 8, 10], [0, 8, 10]] }
    ]
  }
  const expected = [{
    colors: [
      [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4],
      [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4],
      [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4],
      [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4],
      [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4],
      [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]
    ],
    isTransparent: false,
    transforms: defaultTransforms,
    indices: [
      [0, 1, 2], [0, 2, 3],
      [4, 5, 6], [4, 6, 7],
      [8, 9, 10], [8, 10, 11],
      [12, 13, 14], [12, 14, 15],
      [16, 17, 18], [16, 18, 19],
      [20, 21, 22], [20, 22, 23]
    ],
    positions: [
      [0, 2, 4], [0, 2, 10], [0, 8, 10], [0, 8, 4],
      [6, 2, 4], [6, 8, 4], [6, 8, 10], [6, 2, 10],
      [0, 2, 4], [6, 2, 4], [6, 2, 10], [0, 2, 10],
      [0, 8, 4], [0, 8, 10], [6, 8, 10], [6, 8, 4],
      [0, 2, 4], [0, 8, 4], [6, 8, 4], [6, 2, 4],
      [0, 2, 10], [6, 2, 10], [6, 8, 10], [0, 8, 10]
    ],
    normals: [
      Float32Array.from([-1, 0, 0]), Float32Array.from([-1, 0, 0]), Float32Array.from([-1, 0, 0]), Float32Array.from([-1, 0, 0]),
      Float32Array.from([1, 0, 0]), Float32Array.from([1, 0, 0]), Float32Array.from([1, 0, 0]), Float32Array.from([1, 0, 0]),
      Float32Array.from([0, -1, 0]), Float32Array.from([0, -1, 0]), Float32Array.from([0, -1, 0]), Float32Array.from([0, -1, 0]),
      Float32Array.from([0, 1, 0]), Float32Array.from([0, 1, 0]), Float32Array.from([0, 1, 0]), Float32Array.from([0, 1, 0]),
      Float32Array.from([0, 0, -1]), Float32Array.from([0, 0, -1]), Float32Array.from([0, 0, -1]), Float32Array.from([0, 0, -1]),
      Float32Array.from([0, 0, 1]), Float32Array.from([0, 0, 1]), Float32Array.from([0, 0, 1]), Float32Array.from([0, 0, 1])
    ],
    type: '3d'
  }]
  const options = {
    color: [1, 2, 3, 4],
    normalThreshold: 0.3,
    smoothLighting: false
  }
  let geometries = geom3ToGeometries(options, solid)
  t.deepEqual(geometries, expected)

  // options : normalThreshhold

  // options : smoothLighting
  options.smoothLighting = true
  geometries = geom3ToGeometries(options, solid)
  t.deepEqual(geometries, expected)

  // with color
  solid.color = [0, 0, 1, 1]
  expected[0].isTransparent = false
  expected[0].colors = [
    [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1],
    [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1],
    [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1],
    [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1],
    [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1],
    [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1], [0, 0, 1, 1]
  ]
  geometries = geom3ToGeometries(options, solid)
  t.deepEqual(geometries, expected)

  // with transforms
  solid.transforms = [
    5, 0, 0, 0,
    0, 4, 0, 0,
    0, 0, 3, 0,
    0, 0, 0, 2
  ]
  expected[0].transforms = Float32Array.from(solid.transforms)
  geometries = geom3ToGeometries(options, solid)
  t.deepEqual(geometries, expected)
})

test('geom3ToGeometries (solid with > 65000 polygons)', (t) => {
  const solid = { polygons: [] }
  for (let i = 0; i < 70000; i++) {
    solid.polygons.push(
      { vertices: [[i, i, 0], [i + 1, i + 1, 0], [i + 1, i + 1, 1], [i, i, 1]] }
    )
  }

  const options = {
    color: [1, 2, 3, 4],
    normalThreshold: 0.3,
    smoothLighting: false
  }
  const geometries = geom3ToGeometries(options, solid)
  t.is(geometries.length, 5)
})
