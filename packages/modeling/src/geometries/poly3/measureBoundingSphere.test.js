import test from 'ava'

import { mat4 } from '../../maths/index.js'

import { measureBoundingSphere, create, transform } from './index.js'

test('poly3: measureBoundingSphere() should return correct values', (t) => {
  let ply1 = create()
  let exp1 = [0, 0, 0, 0]
  let ret1 = [0, 0, 0, 0]
  ret1 = measureBoundingSphere(ret1, ply1)
  t.deepEqual(ret1, exp1)

  // simple triangle
  let ply2 = create([[0, 0, 0], [0, 10, 0], [0, 10, 10]])
  let exp2 = [0, 5, 5, 7.0710678118654755]
  let ret2 = [0, 0, 0, 0]
  ret2 = measureBoundingSphere(ret2, ply2)
  t.deepEqual(ret2, exp2)

  // simple square
  let ply3 = create([[0, 0, 0], [0, 10, 0], [0, 10, 10], [0, 0, 10]])
  let exp3 = [0, 5, 5, 7.0710678118654755]
  let ret3 = [0, 0, 0, 0]
  ret3 = measureBoundingSphere(ret3, ply3)
  t.deepEqual(ret3, exp3)

  // V-shape
  const vertices = [
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
  let ply4 = create(vertices)
  let exp4 = [0, 4.5, 3, 4.6097722286464435]
  let ret4 = [0, 0, 0, 0]
  ret4 = measureBoundingSphere(ret4, ply4)
  t.deepEqual(ret4, exp4)

  // rotated to various angles
  const rotation = mat4.fromZRotation(mat4.create(), (45 * 0.017453292519943295))
  ply1 = transform(rotation, ply1)
  ply2 = transform(rotation, ply2)
  ply3 = transform(rotation, ply3)
  ply4 = transform(rotation, ply4)
  ret1 = measureBoundingSphere(ret1, ply1)
  ret2 = measureBoundingSphere(ret2, ply2)
  ret3 = measureBoundingSphere(ret3, ply3)
  ret4 = measureBoundingSphere(ret4, ply4)
  exp1 = [0, 0, 0, 0]
  t.deepEqual(ret1, exp1)
  exp2 = [-3.5355339059327373, 3.5355339059327378, 5, 7.0710678118654755]
  t.deepEqual(ret2, exp2)
  exp3 = [-3.5355339059327373, 3.5355339059327378, 5, 7.0710678118654755]
  t.deepEqual(ret3, exp3)
  exp4 = [-3.181980515339464, 3.1819805153394642, 3, 4.6097722286464435]
  t.deepEqual(ret4, exp4)
})
