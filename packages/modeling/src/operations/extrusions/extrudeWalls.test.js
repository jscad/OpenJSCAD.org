const test = require('ava')

const { mat4 } = require('../../math')

const slice = require('./slice')

const extrudeWalls = require('./extrudeWalls')

test('extrudeWalls (same shapes)', t => {
  let matrix = mat4.fromTranslation([0, 0, 10])

  let shape0 = []
  let shape1 = [
    [[-10.0, 10.0], [-10.0, -10.0]],
    [[-10.0, -10.0], [10.0, -10.0]],
    [[10.0, -10.0], [10.0, 10.0]],
    [[10.0, 10.0], [-10.0, 10.0]]
  ]
  let shape2 = [ // hole
    [[-10.0, 10.0], [-10.0, -10.0]],
    [[-10.0, -10.0], [10.0, -10.0]],
    [[10.0, -10.0], [10.0, 10.0]],
    [[10.0, 10.0], [-10.0, 10.0]],
    [[-5.0, -5.0], [-5.0, 5.0]],
    [[5.0, -5.0], [-5.0, -5.0]],
    [[5.0, 5.0], [5.0, -5.0]],
    [[-5.0, 5.0], [5.0, 5.0]]
  ]

  let slice0 = slice.fromSides(shape0)
  let slice1 = slice.fromSides(shape1)
  let slice2 = slice.fromSides(shape2)

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

test('extrudeWalls (different shapes)', t => {
  let matrix = mat4.fromTranslation([0, 0, 10])

  let shape1 = [
    [[-10.0, 10.0], [-10.0, -10.0]],
    [[-10.0, -10.0], [10.0, -10.0]],
    [[10.0, -10.0], [10.0, 10.0]]
  ]
  let shape2 = [
    [[-10.0, 10.0], [-10.0, -10.0]],
    [[-10.0, -10.0], [10.0, -10.0]],
    [[10.0, -10.0], [10.0, 10.0]],
    [[10.0, 10.0], [-10.0, 10.0]]
  ]
  let shape3 = [
    [[2.50000, -4.33013], [5.00000, 0.00000]],
    [[5.00000, 0.00000], [2.50000, 4.33013]],
    [[2.50000, 4.33013], [-2.50000, 4.33013]],
    [[-2.50000, 4.33013], [-5.00000, 0.00000]],
    [[-5.00000, 0.00000], [-2.50000, -4.33013]],
    [[-2.50000, -4.33013], [2.50000, -4.33013]]
  ]

  let slice1 = slice.fromSides(shape1)
  let slice2 = slice.fromSides(shape2)
  let slice3 = slice.fromSides(shape3)

  let walls = extrudeWalls(slice1, slice.transform(matrix, slice2))
  t.is(walls.length, 24)

  walls = extrudeWalls(slice1, slice.transform(matrix, slice3))
  t.is(walls.length, 12)

  walls = extrudeWalls(slice3, slice.transform(matrix, slice2))
  t.is(walls.length, 24)
})
