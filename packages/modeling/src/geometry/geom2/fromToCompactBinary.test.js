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
    0, 0, 0, 1
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
    10, 10, -10, -10, // sides
    -10, -10, 10, -10,
    10, -10, 10, 10,
    5, -5, 6, -4,
    6, -5, 5, -5,
    6, -4, 6, -5
  ])
  t.deepEqual(compacted2, expected2)
})

test('fromCompactBinary: convert a compact form into a geom2', (t) => {
  const compacted1 = new Float32Array([
    0, // type flag
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ])
  const expected1 = create()
  const geometry1 = fromCompactBinary(compacted1)

  t.deepEqual(geometry1.transforms, expected1.transforms)
  t.deepEqual(geometry1.sides, expected1.sides)

  // geometry with a hole
  const compacted2 = new Float32Array([
    0, // type flag
    1, 0, 0, 0, // transforms
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1,
    10, 10, -10, -10, // sides
    -10, -10, 10, -10,
    10, -10, 10, 10,
    5, -5, 6, -4,
    6, -5, 5, -5,
    6, -4, 6, -5
  ])
  const expected2 = create([
    [new Float32Array([10, 10]), new Float32Array([-10, -10])],
    [new Float32Array([-10, -10]), new Float32Array([10, -10])],
    [new Float32Array([10, -10]), new Float32Array([10, 10])],
    [new Float32Array([5, -5]), new Float32Array([6, -4])],
    [new Float32Array([6, -5]), new Float32Array([5, -5])],
    [new Float32Array([6, -4]), new Float32Array([6, -5])]
  ])
  const geometry2 = fromCompactBinary(compacted2)

  t.deepEqual(geometry2.transforms, expected2.transforms)
  t.deepEqual(geometry2.sides, expected2.sides)
})
