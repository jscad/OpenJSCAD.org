import test from 'ava'

import { mat4 } from '../../maths/index.js'

import * as slice from '../../geometries/slice/index.js'

import { extrudeWalls } from './extrudeWalls.js'

test('extrudeWalls (same shapes)', (t) => {
  const matrix = mat4.fromTranslation(mat4.create(), [0, 0, 10])

  const slice0 = slice.create([])
  const slice1 = slice.create([
    [[-10, 10, 0], [-10, -10, 0], [10, -10, 0], [10, 10, 0]]
  ])
  const slice2 = slice.create([
    [[-10, 10, 0], [-10, -10, 0], [10, -10, 0], [10, 10, 0]],
    [[-5, -5, 0], [5, -5, 0], [5, 5, 0], [-5, 5, 0]] // hole
  ])

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

  const slice1 = slice.create([[[-10, 10, 0], [-10, -10, 0], [10, -10, 0]]])
  const slice2 = slice.create([
    [[-10, 10, 0], [-10, -10, 0], [10, -10, 0], [10, 10, 0]]
  ])
  const slice3 = slice.create([[
    [2.5, -4.33013, 0],
    [5, 0, 0],
    [2.5, 4.33013, 0],
    [-2.5, 4.33013, 0],
    [-5, 0, 0],
    [-2.5, -4.33013, 0]
  ]])

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
  const triangle = slice.create([[
    [0, 10, 0], [-8.66, -5, 0], [8.66, -5, 0]
  ]])

  // Hexagon (6 edges) - LCM with triangle is 6, so triangle edges get split
  const hexagon = slice.create([[
    [0, 10, 0], [-8.66, 5, 0],
    [-8.66, -5, 0],
    [0, -10, 0],
    [8.66, -5, 0],
    [8.66, 5, 0]
  ]])

  // Triangle to hexagon requires repartitioning (3 -> 6 edges)
  // This exercises the vec3 reuse optimization in repartitionEdges
  const walls = extrudeWalls(triangle, slice.transform(matrix, hexagon))

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
  const square = slice.create([[
    [-5, 5, 0], [-5, -5, 0], [5, -5, 0], [5, 5, 0]
  ]])

  // Octagon (8 edges) - LCM with square is 8, so square edges get doubled
  const octagon = slice.create([[
    [0, 5, 0],
    [-3.54, 3.54, 0],
    [-5, 0, 0],
    [-3.54, -3.54, 0],
    [0, -5, 0],
    [3.54, -3.54, 0],
    [5, 0, 0],
    [3.54, 3.54, 0]
  ]])

  // Square to octagon requires repartitioning (4 -> 8 edges)
  const walls = extrudeWalls(square, slice.transform(matrix, octagon))

  // 8 edges * 2 triangles per edge = 16 wall polygons
  t.is(walls.length, 16)
})
