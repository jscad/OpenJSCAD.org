const test = require('ava')

const { fromPoints } = require('./index')

test('fromPoints: Creates a populated geom3', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const expected = {
    polygons: [
      {
        vertices: [
          new Float32Array([0, 0, 0]),
          new Float32Array([1, 0, 0]),
          new Float32Array([1, 0, 1])
        ]
      }
    ],
    isRetesselated: false,
    transforms: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  }
  const obs = fromPoints(points)
  t.deepEqual(obs, expected)
})

test('fromPoints: throws for improper points', (t) => {
  t.throws(() => fromPoints(), {instanceOf: Error})
  t.throws(() => fromPoints(0, 0, 0), {instanceOf: Error})
  //t.throws(() => fromPoints([[0, 0]]), {instanceOf: Error})
  //t.throws(() => fromPoints([[[0, 0, 0]]]), {instanceOf: Error})
})
