import test from 'ava'

import { create, isConvex } from './index.js'

test('poly3: isConvex() should return correct values', (t) => {
  const ply1 = create()
  t.true(isConvex(ply1))

  const ply2 = create([[1, 1, 0], [1, 0, 0], [0, 0, 0]])
  t.true(isConvex(ply2))

  const points2ccw = [[0, 0, 3], [10, 10, 3], [0, 5, 3]]
  const ply3 = create(points2ccw)
  t.true(isConvex(ply3))

  const points2cw = [[0, 0, 3], [-10, 10, 3], [0, 5, 3]]
  const ply4 = create(points2cw)
  t.true(isConvex(ply4))

  // V-shape
  const pointsV = [[0, 0, 3], [-10, 10, 3], [0, 5, 3], [10, 10, 3]]
  const ply5 = create(pointsV)
  t.false(isConvex(ply5))
})
