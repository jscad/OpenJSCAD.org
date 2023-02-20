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
