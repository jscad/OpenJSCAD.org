const test = require('ava')

const { bezier } = require('../index')

test('Linear bezier (straight line between two points)', (t) => {
  const straightLine = bezier.create([10, 20])
  t.is(bezier.tangentAt(0, straightLine), 10)
  t.is(bezier.tangentAt(0.5, straightLine), 10)
  t.is(bezier.tangentAt(1, straightLine), 10)
})

test('bezier with non-numbers throws error', (t) => {
  t.throws(() => bezier.create(['what', 20]), { instanceOf: Error })
})

test('quadratic bezier (3 control points)', (t) => {
  const OneDCurve = bezier.create([0, 10, 20])
  t.is(bezier.tangentAt(0, OneDCurve), 20)
  t.is(bezier.tangentAt(0.5, OneDCurve), 20)
  t.is(bezier.tangentAt(1, OneDCurve), 20)
})

test('quadratic bezier (3 control points, non symmetric)', (t) => {
  const OneDCurve = bezier.create([0, 0, 20])
  t.is(bezier.tangentAt(0, OneDCurve), 0)
  t.is(bezier.tangentAt(0.5, OneDCurve), 20)
  t.is(bezier.tangentAt(1, OneDCurve), 40)
})

test('quadratic bezier (4 control points)', (t) => {
  const OneDCurve = bezier.create([0, 0, 20, 20])
  t.is(bezier.tangentAt(0, OneDCurve), 0)
  t.is(bezier.tangentAt(0.5, OneDCurve), 30)
  t.is(bezier.tangentAt(1, OneDCurve), 0)
})

test('bezier with numbers and array of numbers throws error', (t) => {
  t.throws(() => bezier.create([[0, 5, 10], 20]), { instanceOf: Error })
})

test('bezier with array of numbers of different size throws error', (t) => {
  t.throws(() => bezier.create([[0, 5, 10], [20, 0]]), { instanceOf: Error })
})

test('quadratic bezier one dimension, 3 control points', (t) => {
  const OneDCurve = bezier.create([[0], [10], [20]])
  t.deepEqual(bezier.tangentAt(0, OneDCurve), [20])
  t.deepEqual(bezier.tangentAt(0.5, OneDCurve), [20])
  t.deepEqual(bezier.tangentAt(1, OneDCurve), [20])
})

test('quadratic bezier 2 dimensions, 3 control points', (t) => {
  const TwoDCurve = bezier.create([[0, 10], [30, 10], [60, 20]])
  t.deepEqual(bezier.tangentAt(0, TwoDCurve), [60, 0])
  t.deepEqual(bezier.tangentAt(0.5, TwoDCurve), [60, 10])
  t.deepEqual(bezier.tangentAt(1, TwoDCurve), [60, 20])
})

test('bezier throws error when t is not between 0 and 1', (t) => {
  const straightLine = bezier.create([0, 20])
  t.throws(() => bezier.tangentAt(-2, straightLine), { instanceOf: Error })
  t.throws(() => bezier.tangentAt(1.1, straightLine), { instanceOf: Error })
})
