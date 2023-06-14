const test = require('ava')

const { bezier } = require('../index')
const length = require('./length')

const { nearlyEqual } = require('../../../test/helpers/index')

test('calculate the length of an 1D linear bezier with numeric control points', (t) => {
  const bezierCurve = bezier.create([0, 10])
  nearlyEqual(t, length(100, bezierCurve), 10, 0.0001)
  t.true(true)
})

test('calculate the length of an 1D linear bezier with array control points', (t) => {
  const bezierCurve = bezier.create([[0], [10]])
  nearlyEqual(t, length(100, bezierCurve), 10, 0.0001)
  t.true(true)
})

test('calculate the length of a 2D linear bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0], [10, 10]])
  nearlyEqual(t, length(100, bezierCurve), 14.1421, 0.0001)
  t.true(true)
})

test('calculate the length of a 2D quadratic (3 control points) bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0], [0, 10], [10, 10]])
  nearlyEqual(t, length(100, bezierCurve), 16.2320, 0.0001)
  t.true(true)
})

test('calculate the length of a 2D cubic (4 control points) bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0], [0, 10], [10, 10], [10, 0]])
  nearlyEqual(t, length(100, bezierCurve), 19.9992, 0.0001)
  t.true(true)
})

test('calculate the length of a 3D linear bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0, 0], [10, 10, 10]])
  nearlyEqual(t, length(100, bezierCurve), 17.3205, 0.0001)
  t.true(true)
})

test('calculate the length of a 3D quadratic (3 control points) bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0, 0], [5, 5, 5], [0, 0, 10]])
  nearlyEqual(t, length(100, bezierCurve), 12.7125, 0.0001)
  t.true(true)
})

test('calculate the length of a 3D cubic (4 control points) bezier', (t) => {
  const bezierCurve = bezier.create([[0, 0, 0], [5, 5, 5], [0, 0, 10], [-5, -5, 5]])
  nearlyEqual(t, length(100, bezierCurve), 17.2116, 0.0001)
  t.true(true)
})
