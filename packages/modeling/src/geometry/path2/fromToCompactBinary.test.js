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
      0 // isClosed
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
      0, 0, // points
      1, 0,
      0, 1
    ]
  )

  t.deepEqual(compacted2, expected2)
})

test('fromCompactBinary: convert a compact form into a path2', (t) => {
  const compacted1 = new Float32Array(
    [
      2, // type
      1, 0, 0, 0, // transforms
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      0 // isClosed
    ]
  )
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
    0, 0, // points
    1, 0,
    0, 1
  ]
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected2 = fromPoints({ closed: true }, points)
  const geometry2 = fromCompactBinary(compacted2)

  t.deepEqual(geometry2, expected2)
})
