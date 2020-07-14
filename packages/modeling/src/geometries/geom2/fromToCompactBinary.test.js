const test = require('ava')

const { fromCompactBinary, toCompactBinary, create } = require('./index')

test('toCompactBinary: converts geom2 into a compact form', (t) => {
  const geometry1 = create()
  const compacted1 = toCompactBinary(geometry1)
  const expected1 = new Float32Array([
    0, // type flag
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    -1, -1, -1, -1 // color
  ])
  t.deepEqual(compacted1, expected1)

  // geometry with a hole
  const geometry2 = create([[[10, 10], [-10, -10]],
    [[-10, -10], [10, -10]],
    [[10, -10], [10, 10]],
    [[5, -5], [6, -4]],
    [[6, -5], [5, -5]],
    [[6, -4], [6, -5]]])
  const compacted2 = toCompactBinary(geometry2)
  const expected2 = new Float32Array([
    0, // type flag
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    -1, -1, -1, -1, // color
    10, 10, -10, -10, // sides
    -10, -10, 10, -10,
    10, -10, 10, 10,
    5, -5, 6, -4,
    6, -5, 5, -5,
    6, -4, 6, -5
  ])
  t.deepEqual(compacted2, expected2)

  // test color as well
  geometry2.color = [1, 2, 3, 4]
  const compacted3 = toCompactBinary(geometry2)
  const expected3 = new Float32Array([
    0, // type flag
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    1, 2, 3, 4, // color
    10, 10, -10, -10, // sides
    -10, -10, 10, -10,
    10, -10, 10, 10,
    5, -5, 6, -4,
    6, -5, 5, -5,
    6, -4, 6, -5
  ])
  t.deepEqual(compacted3, expected3)
})

test('fromCompactBinary: convert a compact form into a geom2', (t) => {
  const compacted1 = [
    0, // type flag
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    -1, -1, -1, -1 // color
  ]
  const expected1 = create()
  const geometry1 = fromCompactBinary(compacted1)

  t.deepEqual(geometry1, expected1)

  // geometry with a hole
  const compacted2 = [
    0, // type flag
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    -1, -1, -1, -1, // color
    10, 10, -10, -10, // sides
    -10, -10, 10, -10,
    10, -10, 10, 10,
    5, -5, 6, -4,
    6, -5, 5, -5,
    6, -4, 6, -5
  ]
  const expected2 = create([
    [[10, 10], [-10, -10]],
    [[-10, -10], [10, -10]],
    [[10, -10], [10, 10]],
    [[5, -5], [6, -4]],
    [[6, -5], [5, -5]],
    [[6, -4], [6, -5]]
  ])
  const geometry2 = fromCompactBinary(compacted2)

  t.deepEqual(geometry2, expected2)

  // test color as well
  const compacted3 = [
    0, // type flag
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    4, 5, 6, 7, // color
    10, 10, -10, -10, // sides
    -10, -10, 10, -10,
    10, -10, 10, 10,
    5, -5, 6, -4,
    6, -5, 5, -5,
    6, -4, 6, -5
  ]
  expected2.color = [4, 5, 6, 7]
  const geometry3 = fromCompactBinary(compacted3)

  t.deepEqual(geometry3, expected2)
})
