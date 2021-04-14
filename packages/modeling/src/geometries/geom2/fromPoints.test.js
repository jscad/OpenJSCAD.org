const test = require('ava')

const { fromPoints } = require('./index')

test('fromPoints: creates populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {
    sides: [[[0, 1], [0, 0]], [[0, 0], [1, 0]], [[1, 0], [0, 1]]],
    transforms: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  }
  t.deepEqual(fromPoints(points), expected)

  const points2 = [[0, 0], [1, 0], [0, 1], [0, 0]]
  t.deepEqual(fromPoints(points2), expected)
})

test('fromPoints: throws for improper points', (t) => {
  t.throws(() => fromPoints(), { instanceOf: Error })
  t.throws(() => fromPoints(0, 0), { instanceOf: Error })
  t.throws(() => fromPoints([]), { instanceOf: Error })
  t.throws(() => fromPoints([[0, 0]]), { instanceOf: Error })
})
