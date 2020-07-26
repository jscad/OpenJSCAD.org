const test = require('ava')

const { bezier } = require('../index')

test('Linear bezier (straight line between two points)', (t) => {
  const straightLine = bezier.create([10, 20])
  t.deepEqual(straightLine.points, [10, 20])
  t.is(straightLine.pointType, 'float_single')
  t.deepEqual(straightLine.permutations, [1, 1])
  t.deepEqual(straightLine.tangentPermutations, [1])
  t.is(straightLine.dimensions, 0)
})

test('bezier with non-numbers throws error', (t) => {
  t.throws(() => bezier.create(['what', 20]), { instanceOf: Error })
})

test('quadratic bezier (3 control points)', (t) => {
  const OneDCurve = bezier.create([0, 10, 20])
  t.deepEqual(OneDCurve.points, [0, 10, 20])
  t.is(OneDCurve.pointType, 'float_single')
  t.deepEqual(OneDCurve.permutations, [1, 2, 1])
  t.deepEqual(OneDCurve.tangentPermutations, [1, 1])
  t.is(OneDCurve.dimensions, 0)
})

test('quadratic bezier (4 control points)', (t) => {
  const OneDCurve = bezier.create([0, 0, 20, 20])
  t.deepEqual(OneDCurve.points, [0, 0, 20, 20])
  t.is(OneDCurve.pointType, 'float_single')
  t.deepEqual(OneDCurve.permutations, [1, 3, 3, 1])
  t.deepEqual(OneDCurve.tangentPermutations, [1, 2, 1])
  t.is(OneDCurve.dimensions, 0)
})

test('bezier with numbers and array of numbers throws error', (t) => {
  t.throws(() => bezier.create([[0, 5, 10], 20]), { instanceOf: Error })
})

test('bezier with array of numbers of different size throws error', (t) => {
  t.throws(() => bezier.create([[0, 5, 10], [20, 0]]), { instanceOf: Error })
})

test('quadratic bezier one dimension, 3 control points', (t) => {
  const OneDCurve = bezier.create([[0], [10], [20]])
  t.deepEqual(OneDCurve.points, [[0], [10], [20]])
  t.is(OneDCurve.pointType, 'float_1')
  t.deepEqual(OneDCurve.permutations, [1, 2, 1])
  t.deepEqual(OneDCurve.tangentPermutations, [1, 1])
  t.is(OneDCurve.dimensions, 1)
})

test('quadratic bezier 2 dimensions, 3 control points', (t) => {
  const TwoDCurve = bezier.create([[0, 10], [30, 10], [60, 20]])
  t.deepEqual(TwoDCurve.points, [[0, 10], [30, 10], [60, 20]])
  t.is(TwoDCurve.pointType, 'float_2')
  t.deepEqual(TwoDCurve.permutations, [1, 2, 1])
  t.deepEqual(TwoDCurve.tangentPermutations, [1, 1])
  t.is(TwoDCurve.dimensions, 2)
})
