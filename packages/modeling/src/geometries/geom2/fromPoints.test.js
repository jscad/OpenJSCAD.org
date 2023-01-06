import test from 'ava'

import { fromPoints } from './index.js'

test('fromPoints: creates populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    outlines: [[[0, 0], [1, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(fromPoints(points), expected)
})

test('fromPoints: throws for improper points', (t) => {
  t.throws(() => fromPoints(), { instanceOf: Error })
  t.throws(() => fromPoints(0, 0), { instanceOf: Error })
  t.throws(() => fromPoints([]), { instanceOf: Error })
  t.throws(() => fromPoints([[0, 0]]), { instanceOf: Error })
})

test('fromPoints: remove duplicate start/end', (t) => {
  const points = [[0, 0], [2, 0], [0, 3], [0, 0]]
  const expected = {
    outlines: [[[0, 0], [2, 0], [0, 3]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(fromPoints(points), expected)
  t.is(points.length, 4) // don't mutate the input array
})
