const test = require('ava')

const { invert, create, fromPoints } = require('./index')

test('invert: Creates a invert on an empty geom3', (t) => {
  const expected = {
    polygons: [],
    isRetesselated: false,
    transforms: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  }
  const geometry = create()
  const another = invert(geometry)
  t.not(another, geometry)
  t.deepEqual(another, expected)
})

test('invert: Creates a invert of a populated geom3', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const expected = {
    polygons: [
      {
        vertices: [
          new Float32Array([1, 0, 1]),
          new Float32Array([1, 0, 0]),
          new Float32Array([0, 0, 0])
        ]
      }
    ],
    isRetesselated: false,
    transforms: new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1])
  }
  const geometry = fromPoints(points)
  const another = invert(geometry)
  t.not(another, geometry)
  t.deepEqual(another, expected)
})
