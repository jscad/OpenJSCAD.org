const test = require('ava')
const { measureBoundingSphere, create, fromPoints, transform } = require('./index')

const mat4 = require('../../maths/mat4')

const { compareVectors, nearlyEqual } = require('../../../test/helpers/index')

test('poly3: measureBoundingSphere() should return correct values', (t) => {
  let ply1 = create()
  let exp1 = [[0, 0, 0], 0]
  let ret1 = measureBoundingSphere(ply1)
  t.true(compareVectors(ret1[0], exp1[0]))
  nearlyEqual(ret1[1], exp1[1], Number.EPSILON)

  // simple triangle
  let ply2 = fromPoints([[0, 0, 0], [0, 10, 0], [0, 10, 10]])
  let exp2 = [[0, 5, 5], 7.0710678118654755]
  let ret2 = measureBoundingSphere(ply2)
  t.true(compareVectors(ret2[0], exp2[0]))
  nearlyEqual(ret2[1], exp2[1], Number.EPSILON)

  // simple square
  let ply3 = fromPoints([[0, 0, 0], [0, 10, 0], [0, 10, 10], [0, 0, 10]])
  let exp3 = [[0, 5, 5], 7.0710678118654755]
  let ret3 = measureBoundingSphere(ply3)
  t.true(compareVectors(ret3[0], exp3[0]))
  nearlyEqual(ret3[1], exp3[1], Number.EPSILON)

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
  let exp4 = [[0, 4.5, 3], 4.6097722286464435]
  let ret4 = measureBoundingSphere(ply4)
  t.true(compareVectors(ret4[0], exp4[0]))
  nearlyEqual(ret4[1], exp4[1], Number.EPSILON)

  // rotated to various angles
  const rotation = mat4.fromZRotation(mat4.create(), (45 * 0.017453292519943295))
  ply1 = transform(rotation, ply1)
  ply2 = transform(rotation, ply2)
  ply3 = transform(rotation, ply3)
  ply4 = transform(rotation, ply4)
  ret1 = measureBoundingSphere(ply1)
  ret2 = measureBoundingSphere(ply2)
  ret3 = measureBoundingSphere(ply3)
  ret4 = measureBoundingSphere(ply4)
  exp1 = [[0, 0, 0], 0]
  t.true(compareVectors(ret1[0], exp1[0]))
  nearlyEqual(ret1[1], exp1[1], Number.EPSILON)
  exp2 = [[-3.5355339059327373, 3.5355339059327378, 5], 7.0710678118654755]
  t.true(compareVectors(ret2[0], exp2[0]))
  nearlyEqual(ret2[1], exp2[1], Number.EPSILON)
  exp3 = [[-3.5355339059327373, 3.5355339059327378, 5], 7.0710678118654755]
  t.true(compareVectors(ret3[0], exp3[0]))
  nearlyEqual(ret3[1], exp3[1], Number.EPSILON)
  exp4 = [[-3.181980515339464, 3.1819805153394642, 3], 4.6097722286464435]
  t.true(compareVectors(ret4[0], exp4[0]))
  nearlyEqual(ret4[1], exp4[1], Number.EPSILON)
})
