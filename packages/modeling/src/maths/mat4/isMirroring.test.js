const test = require('ava')

const plane = require('../plane')

const { isMirroring, fromScaling, identity, mirrorByPlane, rotate, scale, translate } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: isMirroring() should determine correctlly', (t) => {
  let matrix = identity()
  t.false(isMirroring(matrix))

  matrix = fromScaling([2, 4, 6])
  t.false(isMirroring(matrix))

  const planeX = plane.fromPoints([0, 0, 0], [0, 1, 1], [0, 1, 0])
  const planeY = plane.fromPoints([0, 0, 0], [1, 0, 0], [1, 0, 1])
  const planeZ = plane.fromPoints([0, 0, 0], [1, 0, 0], [1, 1, 0])

  matrix = mirrorByPlane(planeX)
  t.true(isMirroring(matrix))

  matrix = mirrorByPlane(planeY)
  t.true(isMirroring(matrix))

  matrix = mirrorByPlane(planeZ)
  t.true(isMirroring(matrix))

  // additional transforms
  const rotation = 90 * 0.017453292519943295
  matrix = rotate(rotation, [0, 0, 1], matrix)
  t.true(isMirroring(matrix))

  matrix = scale([0.5, 2, 5], matrix)
  t.true(isMirroring(matrix))

  matrix = translate([2, -3, 600], matrix)
  t.true(isMirroring(matrix))
})
