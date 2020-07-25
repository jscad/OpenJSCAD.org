const test = require('ava')

const { bezier } = require('../index')

test('Linear bezier (straight line between two points)', (t) => {
  const straightLine = bezier.create([10,20])
  t.is(straightLine.at(0), 10)
  t.is(straightLine.at(0.5), 15)
  t.is(straightLine.at(1), 20)

  t.is(straightLine.tangentAt(0), 10)
  t.is(straightLine.tangentAt(0.5), 10)
  t.is(straightLine.tangentAt(1), 10)
})

test('bezier with non-numbers throws error', (t) => {
  t.throws(() => bezier.create(['what',20]), Error);
})

test('quadratic bezier (3 control points)', (t) => {
  const OneDCurve = bezier.create([0,10,20])
  t.is(OneDCurve.at(0), 0)
  t.is(OneDCurve.at(0.5), 10)
  t.is(OneDCurve.at(1), 20)

  t.is(OneDCurve.tangentAt(0), 20)
  t.is(OneDCurve.tangentAt(0.5), 20)
  t.is(OneDCurve.tangentAt(1), 20)
})

test('quadratic bezier (3 control points, non symetric)', (t) => {
  const OneDCurve = bezier.create([0,0,20])
  t.is(OneDCurve.at(0), 0)
  t.is(OneDCurve.at(0.5), 5)
  t.is(OneDCurve.at(1), 20)

  t.is(OneDCurve.tangentAt(0), 0)
  t.is(OneDCurve.tangentAt(0.5), 20)
  t.is(OneDCurve.tangentAt(1), 40)
})

test('quadratic bezier (4 control points)', (t) => {
  const OneDCurve = bezier.create([0,0,20,20])
  t.is(OneDCurve.at(0), 0)
  t.is(OneDCurve.at(0.5), 10)
  t.is(OneDCurve.at(1), 20)

  t.is(OneDCurve.tangentAt(0), 0)
  t.is(OneDCurve.tangentAt(0.5), 30)
  t.is(OneDCurve.tangentAt(1), 0)
})

test('bezier with numbers and array of numbers throws error', (t) => {
  t.throws(() => bezier.create([[0,5,10],20]), Error);
})

test('bezier with array of numbers of different size throws error', (t) => {
  t.throws(() => bezier.create([[0,5,10],[20,0]]), Error);
})

test('quadratic bezier one dimension, 3 control points', (t) => {
  const OneDCurve = bezier.create([[0],[10],[20]])
  t.deepEqual(OneDCurve.at(0), new Float32Array([0]))
  t.deepEqual(OneDCurve.at(0.5), new Float32Array([10]))
  t.deepEqual(OneDCurve.at(1), new Float32Array([20]))

  t.deepEqual(OneDCurve.tangentAt(0), new Float32Array([20]))
  t.deepEqual(OneDCurve.tangentAt(0.5), new Float32Array([20]))
  t.deepEqual(OneDCurve.tangentAt(1), new Float32Array([20]))
})

test('quadratic bezier 2 dimensions, 3 control points', (t) => {
  const TwoDCurve = bezier.create([[0,10],[30,10],[60,20]]);
  t.deepEqual(TwoDCurve.at(0), new Float32Array([0,10]))
  t.deepEqual(TwoDCurve.at(0.5), new Float32Array([30,12.5]))
  t.deepEqual(TwoDCurve.at(1), new Float32Array([60,20]))

  t.deepEqual(TwoDCurve.tangentAt(0), new Float32Array([60,0]))
  t.deepEqual(TwoDCurve.tangentAt(0.5), new Float32Array([60,10]))
  t.deepEqual(TwoDCurve.tangentAt(1), new Float32Array([60,20]))

})

test('bezier throws error when t is not between 0 and 1', (t) => {
  const straightLine = bezier.create([0,20]);
  t.throws(() => straightLine.at(-2), Error);
  t.throws(() => straightLine.at(1.1), Error);
})

