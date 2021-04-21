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
