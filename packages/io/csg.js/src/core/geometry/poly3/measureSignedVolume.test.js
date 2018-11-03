const test = require('ava')

const { measureSignedVolume, create, fromPoints, transform } = require('./index')

const mat4 = require('../../math/mat4')

const { nearlyEqual } = require('../../../../test/helpers/index')

test('poly3: measureSignedVolume() should return correct values', (t) => {
  let ply1 = create()
  let ret1 = measureSignedVolume(ply1)
  nearlyEqual(ret1, 0.0, Number.EPSILON)

  // simple triangle
  let ply2 = fromPoints([[0, 0, 0], [0, 10, 0], [0, 10, 10]])
  let ret2 = measureSignedVolume(ply2)
  nearlyEqual(ret2, 0.0, Number.EPSILON)

  // simple square
  let ply3 = fromPoints([[0, 0, 0], [0, 10, 0], [0, 10, 10], [0, 0, 10]])
  let ret3 = measureSignedVolume(ply3)
  nearlyEqual(ret3, 0.0, Number.EPSILON)

  // V-shape
  const points = [
    [0, 3, 0],
    [0, 5, 0],
    [0, 8, 2],
    [0, 6, 5],
    [0, 8, 6],
    [0, 5, 6],
    [0, 5, 2],
    [0, 2, 5],
    [0, 1, 3],
    [0, 3, 3]
  ]
  let ply4 = fromPoints(points)
  let ret4 = measureSignedVolume(ply4)
  nearlyEqual(ret4, 0.0, Number.EPSILON)

  // rotated to various angles
  const rotation = mat4.fromZRotation((45 * 0.017453292519943295))
  ply1 = transform(rotation, ply1)
  ply2 = transform(rotation, ply2)
  ply3 = transform(rotation, ply3)
  ply4 = transform(rotation, ply4)
  ret1 = measureSignedVolume(ply1)
  ret2 = measureSignedVolume(ply2)
  ret3 = measureSignedVolume(ply3)
  ret4 = measureSignedVolume(ply4)
  nearlyEqual(ret1, 0.0, Number.EPSILON)
  nearlyEqual(ret2, 0.0, Number.EPSILON)
  nearlyEqual(ret3, 0.0, Number.EPSILON)
  nearlyEqual(ret4, 0.0, Number.EPSILON)

  t.true(true)
})
