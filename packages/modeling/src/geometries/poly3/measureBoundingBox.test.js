const test = require('ava')
const { measureBoundingBox, create, fromPoints, transform } = require('./index')

const mat4 = require('../../maths/mat4')

const { compareVectors } = require('../../../test/helpers/index')

test('poly3: measureBoundingBox() should return correct values', (t) => {
  let ply1 = create()
  let exp1 = [[0, 0, 0], [0, 0, 0]]
  let ret1 = measureBoundingBox(ply1)
  t.true(compareVectors(ret1[0], exp1[0]))
  t.true(compareVectors(ret1[1], exp1[1]))

  // simple triangle
  let ply2 = fromPoints([[0, 0, 0], [0, 10, 0], [0, 10, 10]])
  let exp2 = [[0, 0, 0], [0, 10, 10]]
  let ret2 = measureBoundingBox(ply2)
  t.true(compareVectors(ret2[0], exp2[0]))
  t.true(compareVectors(ret2[1], exp2[1]))

  // simple square
  let ply3 = fromPoints([[0, 0, 0], [0, 10, 0], [0, 10, 10], [0, 0, 10]])
  let exp3 = [[0, 0, 0], [0, 10, 10]]
  let ret3 = measureBoundingBox(ply3)
  t.true(compareVectors(ret3[0], exp3[0]))
  t.true(compareVectors(ret3[1], exp3[1]))

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
  let exp4 = [[0, 1, 0], [0, 8, 6]]
  let ret4 = measureBoundingBox(ply4)
  t.true(compareVectors(ret4[0], exp4[0]))
  t.true(compareVectors(ret4[1], exp4[1]))

  // rotated to various angles
  const rotation = mat4.fromZRotation(mat4.create(), (45 * 0.017453292519943295))
  ply1 = transform(rotation, ply1)
  ply2 = transform(rotation, ply2)
  ply3 = transform(rotation, ply3)
  ply4 = transform(rotation, ply4)
  ret1 = measureBoundingBox(ply1)
  ret2 = measureBoundingBox(ply2)
  ret3 = measureBoundingBox(ply3)
  ret4 = measureBoundingBox(ply4)
  exp1 = [[0, 0, 0], [0, 0, 0]]
  t.true(compareVectors(ret1[0], exp1[0]))
  t.true(compareVectors(ret1[1], exp1[1]))
  exp2 = [[-7.071067811865475, 0, 0], [0, 7.0710678118654755, 10]]
  t.true(compareVectors(ret2[0], exp2[0]))
  t.true(compareVectors(ret2[1], exp2[1]))
  exp3 = [[-7.071067811865475, 0, 0], [0, 7.0710678118654755, 10]]
  t.true(compareVectors(ret3[0], exp3[0]))
  t.true(compareVectors(ret3[1], exp3[1]))
  exp4 = [[-5.65685424949238, 0.7071067811865476, 0], [-0.7071067811865475, 5.656854249492381, 6]]
  t.true(compareVectors(ret4[0], exp4[0]))
  t.true(compareVectors(ret4[1], exp4[1]))
})
