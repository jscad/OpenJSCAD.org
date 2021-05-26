import test from 'ava'

import { isConvex, create, fromPoints } from './index'

import Vec3 from '../../maths/vec3/type'

test('poly3: isConvex() should return correct values', (t) => {
  const ply1 = create()
  t.true(isConvex(ply1))

  const ply2 = fromPoints([[1, 1, 0], [1, 0, 0], [0, 0, 0]])
  t.true(isConvex(ply2))

  const points2ccw: Array<Vec3> = [[0, 0, 3], [10, 10, 3], [0, 5, 3]]
  const ply3 = fromPoints(points2ccw)
  t.true(isConvex(ply3))

  const points2cw: Array<Vec3> = [[0, 0, 3], [-10, 10, 3], [0, 5, 3]]
  const ply4 = fromPoints(points2cw)
  t.true(isConvex(ply4))

  // V-shape
  const pointsV: Array<Vec3> = [[0, 0, 3], [-10, 10, 3], [0, 5, 3], [10, 10, 3]]
  const ply5 = fromPoints(pointsV)
  t.false(isConvex(ply5))
})
