const test = require('ava')

const { mat4 } = require('../../maths')

const slice = require('./slice')

const extrudeWalls = require('./extrudeWalls')

test('extrudeWalls (same shapes)', (t) => {
  const matrix = mat4.fromTranslation(mat4.create(), [0, 0, 10])

  const shape0 = []
  const shape1 = [
    [[-10.0, 10.0], [-10.0, -10.0]],
    [[-10.0, -10.0], [10.0, -10.0]],
    [[10.0, -10.0], [10.0, 10.0]],
    [[10.0, 10.0], [-10.0, 10.0]]
  ]
  const shape2 = [ // hole
    [[-10.0, 10.0], [-10.0, -10.0]],
    [[-10.0, -10.0], [10.0, -10.0]],
    [[10.0, -10.0], [10.0, 10.0]],
    [[10.0, 10.0], [-10.0, 10.0]],
    [[-5.0, -5.0], [-5.0, 5.0]],
    [[5.0, -5.0], [-5.0, -5.0]],
    [[5.0, 5.0], [5.0, -5.0]],
    [[-5.0, 5.0], [5.0, 5.0]]
  ]

  const slice0 = slice.fromSides(shape0)
  const slice1 = slice.fromSides(shape1)
  const slice2 = slice.fromSides(shape2)

  // empty slices
  let walls = extrudeWalls(slice0, slice0)
  t.is(walls.length, 0)

  // outline slices
  walls = extrudeWalls(slice1, slice.transform(matrix, slice1))
  t.is(walls.length, 8)

  // slices with holes
  walls = extrudeWalls(slice2, slice.transform(matrix, slice2))
  t.is(walls.length, 16)
})

test('extrudeWalls (different shapes)', (t) => {
  const matrix = mat4.fromTranslation(mat4.create(), [0, 0, 10])

  const shape1 = [
    [[-10.0, 10.0], [-10.0, -10.0]],
    [[-10.0, -10.0], [10.0, -10.0]],
    [[10.0, -10.0], [10.0, 10.0]]
  ]
  const shape2 = [
    [[-10.0, 10.0], [-10.0, -10.0]],
    [[-10.0, -10.0], [10.0, -10.0]],
    [[10.0, -10.0], [10.0, 10.0]],
    [[10.0, 10.0], [-10.0, 10.0]]
  ]
  const shape3 = [
    [[2.50000, -4.33013], [5.00000, 0.00000]],
    [[5.00000, 0.00000], [2.50000, 4.33013]],
    [[2.50000, 4.33013], [-2.50000, 4.33013]],
    [[-2.50000, 4.33013], [-5.00000, 0.00000]],
    [[-5.00000, 0.00000], [-2.50000, -4.33013]],
    [[-2.50000, -4.33013], [2.50000, -4.33013]]
  ]

  const slice1 = slice.fromSides(shape1)
  const slice2 = slice.fromSides(shape2)
  const slice3 = slice.fromSides(shape3)

  let walls = extrudeWalls(slice1, slice.transform(matrix, slice2))
  t.is(walls.length, 24)

  walls = extrudeWalls(slice1, slice.transform(matrix, slice3))
  t.is(walls.length, 12)

  walls = extrudeWalls(slice3, slice.transform(matrix, slice2))
  t.is(walls.length, 24)
})

// Test for vec3 reuse optimization in repartitionEdges
// When shapes have different edge counts, edges are repartitioned using vec3 operations
test('extrudeWalls (repartitionEdges vec3 reuse)', (t) => {
  const matrix = mat4.fromTranslation(mat4.create(), [0, 0, 5])

  // Triangle (3 edges)
  const triangle = [
    [[0, 10], [-8.66, -5]],
    [[-8.66, -5], [8.66, -5]],
    [[8.66, -5], [0, 10]]
  ]

  // Hexagon (6 edges) - LCM with triangle is 6, so triangle edges get split
  const hexagon = [
    [[0, 10], [-8.66, 5]],
    [[-8.66, 5], [-8.66, -5]],
    [[-8.66, -5], [0, -10]],
    [[0, -10], [8.66, -5]],
    [[8.66, -5], [8.66, 5]],
    [[8.66, 5], [0, 10]]
  ]

  const sliceTriangle = slice.fromSides(triangle)
  const sliceHexagon = slice.fromSides(hexagon)

  // Triangle to hexagon requires repartitioning (3 -> 6 edges)
  // This exercises the vec3 reuse optimization in repartitionEdges
  const walls = extrudeWalls(sliceTriangle, slice.transform(matrix, sliceHexagon))

  // 6 edges * 2 triangles per edge = 12 wall polygons
  t.is(walls.length, 12)

  // Verify all walls are valid triangles
  walls.forEach((wall) => {
    t.is(wall.vertices.length, 3)
  })
})

// Test for vec3 reuse with higher repartition multiple
test('extrudeWalls (repartitionEdges with high multiple)', (t) => {
  const matrix = mat4.fromTranslation(mat4.create(), [0, 0, 10])

  // Square (4 edges)
  const square = [
    [[-5, 5], [-5, -5]],
    [[-5, -5], [5, -5]],
    [[5, -5], [5, 5]],
    [[5, 5], [-5, 5]]
  ]

  // Octagon (8 edges) - LCM with square is 8, so square edges get doubled
  const octagon = [
    [[0, 5], [-3.54, 3.54]],
    [[-3.54, 3.54], [-5, 0]],
    [[-5, 0], [-3.54, -3.54]],
    [[-3.54, -3.54], [0, -5]],
    [[0, -5], [3.54, -3.54]],
    [[3.54, -3.54], [5, 0]],
    [[5, 0], [3.54, 3.54]],
    [[3.54, 3.54], [0, 5]]
  ]

  const sliceSquare = slice.fromSides(square)
  const sliceOctagon = slice.fromSides(octagon)

  // Square to octagon requires repartitioning (4 -> 8 edges)
  const walls = extrudeWalls(sliceSquare, slice.transform(matrix, sliceOctagon))

  // 8 edges * 2 triangles per edge = 16 wall polygons
  t.is(walls.length, 16)
})
