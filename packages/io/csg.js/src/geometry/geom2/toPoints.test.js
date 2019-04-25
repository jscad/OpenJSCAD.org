const test = require('ava')

const {toPoints, create, fromPoints, toString} = require('./index')

test('toPoints: creates an empty array of points from a unpopulated geom2', (t) => {
  const geometry = create()
  const pointarray = toPoints(geometry)
  t.deepEqual(pointarray, [])
})

test('toPoints: creates an array of points from a populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const geometry = fromPoints(points)

  toString(geometry)

  const expected = [
    new Float32Array([0, 0]),
    new Float32Array([1, 0]),
    new Float32Array([0, 1])
  ]
  const pointarray = toPoints(geometry)
  t.deepEqual(pointarray, expected)

  toString(geometry)
})
