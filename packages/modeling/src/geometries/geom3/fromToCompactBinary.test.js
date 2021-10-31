const test = require('ava')

const { fromCompactBinary, toCompactBinary, create, fromPoints } = require('./index')

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
      -1, -1, -1, -1, // color
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
      -1, -1, -1, -1, // color
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

  // test color as well
  geometry.color = [1, 2, 3, 4]
  const compacted2 = toCompactBinary(geometry)
  const expected2 = new Float32Array(
    [
      1, // type
      1, 0, 0, 0, // transforms
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      1, 2, 3, 4, // color
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

  t.deepEqual(compacted2, expected2)
})

test('fromCompactBinary: convert a compact form into a geom3', (t) => {
  const compactedDefault = [
    1, // type
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    -1, -1, -1, -1, // color
    0 // number of vertices
  ]
  let expected = create()
  let geometry = fromCompactBinary(compactedDefault)

  t.deepEqual(geometry, expected)

  const compacted1 = [
    1, // type
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    -1, -1, -1, -1, // color
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
  const points = [[[0, 0, 0], [1, 0, 0], [2, 0, 2]], [[0, 0, 0], [1, 0, 0], [2, 0, 2], [-3, 0, 3]]]
  expected = fromPoints(points)
  geometry = fromCompactBinary(compacted1)

  t.deepEqual(geometry, expected)

  // test color as well
  const compacted2 = [
    1, // type
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    4, 5, 6, 7, // color
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
  expected.color = [4, 5, 6, 7]
  geometry = fromCompactBinary(compacted2)

  t.deepEqual(geometry, expected)
})
