const test = require('ava')

const { fromCompactBinary, toCompactBinary, create, fromPoints, equals } = require('./index')

test('toCompactBinary: converts geom3 (default)', (t) => {
  const geometry = create()
  const compacted = toCompactBinary(geometry)
  const expected = new Float32Array(
    [
      1, // type
      1, 0, 0, 0, // transforms
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      0, // isRetesselated flag
      0 // number of vertices
    ]
  )
  t.deepEqual(compacted, expected)
})

test('toCompactBinary: converts geom3 into a compact form', (t) => {
  // two polygons; 3 points, 4 points
  const points = [[[0, 0, 0], [1, 0, 0], [2, 0, 2]], [[0, 0, 0], [1, 0, 0], [2, 0, 2], [-3, 0, 3]]]
  const geometry = fromPoints(points)
  const compacted = toCompactBinary(geometry)
  const expected = new Float32Array(
    [
      1, // type
      1, 0, 0, 0, // transforms
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      0, // isRetesselated flag
      7, // number of vertices
      3, // number of vertices per polygon (2)
      4,
      0, 0, 0, // vertices (7)
      1, 0, 0,
      2, 0, 2,
      0, 0, 0,
      1, 0, 0,
      2, 0, 2,
      -3, 0, 3
    ]
  )

  t.deepEqual(compacted, expected)
})

test('fromCompactBinary: convert a compact form into a geom3', (t) => {
  const compactedDefault = new Float32Array(
    [
      1, // type
      1, 0, 0, 0, // transforms
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      0, // isRetesselated flag
      0 // number of vertices
    ]
  )
  let expected = create()
  let geometry = fromCompactBinary(compactedDefault)

  t.is(equals(geometry, expected), true)

  const compacted = new Float32Array(
    [
      1, // type
      1, 0, 0, 0, // transforms
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      0, // isRetesselated flag
      7, // number of vertices
      3, // number of vertices per polygon (2)
      4,
      0, 0, 0, // vertices (7)
      1, 0, 0,
      2, 0, 2,
      0, 0, 0,
      1, 0, 0,
      2, 0, 2,
      -3, 0, 3
    ]
  )
  const points = [[[0, 0, 0], [1, 0, 0], [2, 0, 2]], [[0, 0, 0], [1, 0, 0], [2, 0, 2], [-3, 0, 3]]]
  expected = fromPoints(points)
  geometry = fromCompactBinary(compacted)

  t.is(equals(geometry, expected), true)
})
