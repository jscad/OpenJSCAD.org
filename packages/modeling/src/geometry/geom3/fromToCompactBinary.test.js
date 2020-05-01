const test = require('ava')

const { fromCompactBinary, toCompactBinary, fromPoints, equals } = require('./index')

test('toCompactBinary: converts geom3 into a compact form', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const geom2 = fromPoints(points)
  const compacted = toCompactBinary(geom2)
  const expected = new Float32Array(
    [
      1, // type flag
      0, // isRetesselated flag
      1, 0, 0, 0, // transforms matrix
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      // geometry
      0, -1, 0, 0, // plane
      0, 0, 0, // vertices
      1, 0, 0,
      1, 0, 1
    ]
  )

  t.deepEqual(Array.from(compacted), Array.from(expected))
  // check if fromCompactBinary can get back the same data as the original geometry
  t.is(equals(fromCompactBinary(compacted), geom2), true)
})

test('fromCompactBinary: convert a compact form into a geom3', (t) => {
  const compacted = [
    1, // type flag
    0, // isRetesselated flag
    1, 0, 0, 0, // transforms matrix
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    // geometry
    0, -1, 0, 0, // plane
    0, 0, 0, // vertices
    1, 0, 0,
    1, 0, 1
  ]
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const expected = fromPoints(points)
  const geom3 = fromCompactBinary(compacted)

  t.is(equals(geom3, expected), true)
})
