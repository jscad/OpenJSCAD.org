import test from 'ava'

import { fromPoints } from './index'

import Vec2 from '../../maths/vec2/type'

test('fromPoints: creates populated geom2', (t) => {
  const points: Array<Vec2> = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    sides: [[[0, 1], [0, 0]], [[0, 0], [1, 0]], [[1, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(fromPoints(points), expected)

  const points2: Array<Vec2> = [[0, 0], [1, 0], [0, 1], [0, 0]]
  t.deepEqual(fromPoints(points2), expected)
})
