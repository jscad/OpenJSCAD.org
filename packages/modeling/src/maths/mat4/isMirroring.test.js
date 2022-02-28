const test = require('ava')

const plane = require('../plane')

const { isMirroring, fromScaling, create, mirrorByPlane, rotate, scale, translate } = require('./index')

test('mat4: isMirroring() should determine correctly', (t) => {
  let matrix = create()
  t.false(isMirroring(matrix))

  matrix = fromScaling(create(), [2, 4, 6])
  t.false(isMirroring(matrix))

  const planeX = plane.fromPoints(plane.create(), [0, 0, 0], [0, 1, 1], [0, 1, 0])
  const planeY = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 0, 1])
  const planeZ = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 1, 0])

  matrix = mirrorByPlane(create(), planeX)
  t.true(isMirroring(matrix))

  matrix = mirrorByPlane(create(), planeY)
  t.true(isMirroring(matrix))

  matrix = mirrorByPlane(create(), planeZ)
  t.true(isMirroring(matrix))

  // additional transforms
  const rotation = 90 * 0.017453292519943295
  matrix = rotate(matrix, matrix, rotation, [0, 0, 1])
  t.true(isMirroring(matrix))

  matrix = scale(matrix, matrix, [0.5, 2, 5])
  t.true(isMirroring(matrix))

  matrix = translate(matrix, matrix, [2, -3, 600])
  t.true(isMirroring(matrix))
})
