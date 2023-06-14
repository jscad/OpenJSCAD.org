const test = require('ava')

const { bezier } = require('../index')
const lengths = require('./lengths')

const { nearlyEqual } = require('../../../test/helpers/index')

test('calculate lengths for a 1D linear bezier with numeric control points', (t) => {
  const bezierCurve = bezier.create([0, 10])
  const result = lengths(100, bezierCurve)
  t.is(result.length, 101) // with the default number of segments (100) the length of the array should be 101
  nearlyEqual(t, result[0], 0, 0.0001) // first element is always 0
  nearlyEqual(t, result[50], 5, 0.0001) // the mid element contains half the curve length
  nearlyEqual(t, result[100], 10, 0.0001) // the last element of the array contains the entire curve length
})

test('calculate lengths for a 1D linear bezier with array control points', (t) => {
  const bezierCurve = bezier.create([[0], [10]])
  const result = lengths(100, bezierCurve)
  t.is(result.length, 101)
  nearlyEqual(t, result[0], 0, 0.0001)
  nearlyEqual(t, result[50], 5, 0.0001)
  nearlyEqual(t, result[100], 10, 0.0001)
})

test('calculate lengths for a 2D linear bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0], [10, 10]])
  const result = lengths(100, bezierCurve)
  t.is(result.length, 101)
  nearlyEqual(t, result[0], 0, 0.0001)
  nearlyEqual(t, result[50], 7.0710, 0.0001)
  nearlyEqual(t, result[100], 14.1421, 0.0001)
})

test('calculate lengths for a 2D quadratic (3 control points) bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0], [0, 10], [10, 10]])
  const result = lengths(100, bezierCurve)
  t.is(result.length, 101)
  nearlyEqual(t, result[0], 0, 0.0001)
  nearlyEqual(t, result[50], 8.1160, 0.0001)
  nearlyEqual(t, result[100], 16.2320, 0.0001)
})

test('calculate lengths for a 2D cubic (4 control points) bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0], [0, 10], [10, 10], [10, 0]])
  const result = lengths(100, bezierCurve)
  t.is(result.length, 101)
  nearlyEqual(t, result[0], 0, 0.0001)
  nearlyEqual(t, result[50], 9.9996, 0.0001)
  nearlyEqual(t, result[100], 19.9992, 0.0001)
})

test('calculate lengths for a 3D linear bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0, 0], [10, 10, 10]])
  const result = lengths(100, bezierCurve)
  t.is(result.length, 101)
  nearlyEqual(t, result[0], 0, 0.0001)
  nearlyEqual(t, result[50], 8.6602, 0.0001)
  nearlyEqual(t, result[100], 17.3205, 0.0001)
})

test('calculate lengths for a 3D quadratic (3 control points) bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0, 0], [5, 5, 5], [0, 0, 10]])
  const result = lengths(100, bezierCurve)
  t.is(result.length, 101)
  nearlyEqual(t, result[0], 0, 0.0001)
  nearlyEqual(t, result[50], 6.3562, 0.0001)
  nearlyEqual(t, result[100], 12.7125, 0.0001)
})

test('calculate lengths for a 3D cubic (4 control points) bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0, 0], [5, 5, 5], [0, 0, 10], [-5, -5, 5]])
  const result = lengths(100, bezierCurve)
  t.is(result.length, 101)
  nearlyEqual(t, result[0], 0, 0.0001)
  nearlyEqual(t, result[50], 7.7617, 0.0001)
  nearlyEqual(t, result[100], 17.2116, 0.0001)
})
