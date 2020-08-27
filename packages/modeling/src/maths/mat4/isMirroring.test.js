const test = require('ava')

const plane = require('../plane')

const { isMirroring, fromScaling, identity, mirrorByPlane } = require('./index')

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
})
