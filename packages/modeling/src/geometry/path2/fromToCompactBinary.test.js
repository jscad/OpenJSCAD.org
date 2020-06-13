const test = require('ava')

const { fromCompactBinary, toCompactBinary, create, fromPoints } = require('./index')

test('toCompactBinary: converts path2 into a compact form', (t) => {
  const geometry1 = create()
  const compacted1 = toCompactBinary(geometry1)
  const expected1 = new Float32Array(
    [
      2, // type
      1, 0, 0, 0, // transforms
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      0, // isClosed
      -1, -1, -1, -1 // color
    ]
  )

  t.deepEqual(compacted1, expected1)

  const points = [[0, 0], [1, 0], [0, 1]]
  const geometry2 = fromPoints({ closed: true }, points)
  const compacted2 = toCompactBinary(geometry2)
  const expected2 = new Float32Array(
    [
      2, // type
      1, 0, 0, 0, // transforms
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      1, // closed/open flag
      -1, -1, -1, -1, // color
      0, 0, // points
      1, 0,
      0, 1
    ]
  )

  t.deepEqual(compacted2, expected2)

  // test color as well
  geometry2.color = [1, 2, 3, 4]
  const compacted3 = toCompactBinary(geometry2)
  const expected3 = new Float32Array(
    [
      2, // type
      1, 0, 0, 0, // transforms
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      1, // closed/open flag
      1, 2, 3, 4, // color
      0, 0, // points
      1, 0,
      0, 1
    ]
  )

  t.deepEqual(compacted3, expected3)
})

test('fromCompactBinary: convert a compact form into a path2', (t) => {
  const compacted1 = [
    2, // type
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    0, // isClosed
    -1, -1, -1, -1 // color
  ]
  const expected1 = create()
  const geometry1 = fromCompactBinary(compacted1)

  t.deepEqual(geometry1, expected1)

  const compacted2 = [
    2, // type
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    1, // closed/open flag
    -1, -1, -1, -1, // color
    0, 0, // points
    1, 0,
    0, 1
  ]
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected2 = fromPoints({ closed: true }, points)
  const geometry2 = fromCompactBinary(compacted2)

  t.deepEqual(geometry2, expected2)

  // test color as well
  const compacted3 = [
    2, // type
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    1, // closed/open flag
    5, 6, 7, 8, // color
    0, 0, // points
    1, 0,
    0, 1
  ]
  const expected3 = fromPoints({ closed: true }, points)
  expected3.color = [5, 6, 7, 8]
  const geometry3 = fromCompactBinary(compacted3)

  t.deepEqual(geometry3, expected3)
})
