const test = require('ava')

const { fromCompactBinary, toCompactBinary, fromPoints } = require('./index')

test('toCompactBinary: converts path2 into a compact form', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const path = fromPoints({ closed: true }, points)
  const compacted = toCompactBinary(path)
  const expected = new Float32Array(
    [
      2, // type flag
      1, // closed/open flag
      1, 0, 0, 0, // transforms matrix
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
      // geometry
      0, 0,
      1, 0,
      0, 1
    ]
  )

  t.deepEqual(Array.from(compacted), Array.from(expected))
  // check if fromCompactBinary can get back the same data as the original geometry
  t.deepEqual(fromCompactBinary(compacted), path)
})

test('fromCompactBinary: convert a compact form into a path2', (t) => {
  const compacted = [
    2, // type flag
    1, // closed/open flag
    1, 0, 0, 0, // matrix
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    // geometry
    0, 0,
    1, 0,
    0, 1
  ]
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = fromPoints({ closed: true }, points)
  const path2 = fromCompactBinary(compacted)

  t.deepEqual(path2, expected)
})
