const test = require('ava')
const { measureArea, create, invert, fromPoints, transform } = require('./index')

const mat4 = require('../../maths/mat4')

const { nearlyEqual } = require('../../../test/helpers/index')

test('poly3: measureArea() should return correct values', (t) => {
  let ply1 = create()
  let ret1 = measureArea(ply1)
  t.is(ret1, 0.0)

  // simple triangle
  let ply2 = fromPoints([[0, 0, 0], [0, 10, 0], [0, 10, 10]])
  let ret2 = measureArea(ply2)
  t.is(ret2, 50.0)

  // simple square
  let ply3 = fromPoints([[0, 0, 0], [0, 10, 0], [0, 10, 10], [0, 0, 10]])
  let ret3 = measureArea(ply3)
  t.is(ret3, 100.0)

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
  let ret4 = measureArea(ply4)
  t.is(ret4, 19.5)

  // colinear vertices non-zero area
  const ply5 = fromPoints([[0, 0, 0], [1, 0, 0], [2, 0, 0], [0, 1, 0]])
  const ret5 = measureArea(ply5)
  t.is(ret5, 1)

  // colinear vertices empty area
  const ply6 = fromPoints([[0, 0, 0], [1, 0, 0], [2, 0, 0]])
  const ret6 = measureArea(ply6)
  t.is(ret6, 0)

  // duplicate vertices empty area
  const ply7 = fromPoints([[0, 0, 0], [0, 0, 0], [0, 0, 0]])
  const ret7 = measureArea(ply7)
  t.is(ret7, 0)

  // rotated to various angles
  let rotation = mat4.fromZRotation(mat4.create(), (45 * 0.017453292519943295))
  ply1 = transform(rotation, ply1)
  ply2 = transform(rotation, ply2)
  ply3 = transform(rotation, ply3)
  ply4 = transform(rotation, ply4)
  ret1 = measureArea(ply1)
  ret2 = measureArea(ply2)
  ret3 = measureArea(ply3)
  ret4 = measureArea(ply4)
  nearlyEqual(t, ret1, 0.0, Number.EPSILON)
  nearlyEqual(t, ret2, 50.0, Number.EPSILON)
  nearlyEqual(t, ret3, 100.0, Number.EPSILON)
  nearlyEqual(t, ret4, 19.5, Number.EPSILON)

  rotation = mat4.fromYRotation(mat4.create(), (45 * 0.017453292519943295))
  ply1 = transform(rotation, ply1)
  ply2 = transform(rotation, ply2)
  ply3 = transform(rotation, ply3)
  ply4 = transform(rotation, ply4)
  ret1 = measureArea(ply1)
  ret2 = measureArea(ply2)
  ret3 = measureArea(ply3)
  ret4 = measureArea(ply4)
  nearlyEqual(t, ret1, 0.0, Number.EPSILON)
  nearlyEqual(t, ret2, 50.0, Number.EPSILON)
  nearlyEqual(t, ret3, 100.0, Number.EPSILON)
  nearlyEqual(t, ret4, 19.5, Number.EPSILON)

  rotation = mat4.fromXRotation(mat4.create(), (45 * 0.017453292519943295))
  ply1 = transform(rotation, ply1)
  ply2 = transform(rotation, ply2)
  ply3 = transform(rotation, ply3)
  ply4 = transform(rotation, ply4)
  ret1 = measureArea(ply1)
  ret2 = measureArea(ply2)
  ret3 = measureArea(ply3)
  ret4 = measureArea(ply4)
  nearlyEqual(t, ret1, 0.0, Number.EPSILON)
  nearlyEqual(t, ret2, 50.0, Number.EPSILON)
  nearlyEqual(t, ret3, 100.0, Number.EPSILON)
  nearlyEqual(t, ret4, 19.5, Number.EPSILON)

  // inverted
  ply1 = invert(ply1)
  ply2 = invert(ply2)
  ply3 = invert(ply3)
  ply4 = invert(ply4)
  ret1 = measureArea(ply1)
  ret2 = measureArea(ply2)
  ret3 = measureArea(ply3)
  ret4 = measureArea(ply4)
  nearlyEqual(t, ret1, 0.0, Number.EPSILON)
  nearlyEqual(t, ret2, 50.0, Number.EPSILON)
  nearlyEqual(t, ret3, 100.0, Number.EPSILON)
  nearlyEqual(t, ret4, 19.5, Number.EPSILON * 2)
})
