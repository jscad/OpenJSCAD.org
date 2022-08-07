const test = require('ava')

const { comparePoints, comparePolygonsAsPoints } = require('../../../test/helpers')

const { TAU } = require('../../maths/constants')

const { geom2, geom3 } = require('../../geometries')

const { extrudeRotate } = require('./index')

test('extrudeRotate: (defaults) extruding of a geom2 produces an expected geom3', (t) => {
  const geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  const geometry3 = extrudeRotate({ }, geometry2)
  const pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 96)
})

test('extrudeRotate: (angle) extruding of a geom2 produces an expected geom3', (t) => {
  const geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  // test angle
  let geometry3 = extrudeRotate({ segments: 4, angle: TAU / 8 }, geometry2)
  let pts = geom3.toPoints(geometry3)
  const exp = [
    [[10, 0, 8], [26, 0, 8], [18.38477631085024, 18.384776310850235, 8]],
    [[10, 0, 8], [18.38477631085024, 18.384776310850235, 8], [7.0710678118654755, 7.071067811865475, 8]],
    [[10, 0, -8], [10, 0, 8], [7.0710678118654755, 7.071067811865475, 8]],
    [[10, 0, -8], [7.0710678118654755, 7.071067811865475, 8], [7.0710678118654755, 7.071067811865475, -8]],
    [[26, 0, -8], [10, 0, -8], [7.0710678118654755, 7.071067811865475, -8]],
    [[26, 0, -8], [7.0710678118654755, 7.071067811865475, -8], [18.38477631085024, 18.384776310850235, -8]],
    [[26, 0, 8], [26, 0, -8], [18.38477631085024, 18.384776310850235, -8]],
    [[26, 0, 8], [18.38477631085024, 18.384776310850235, -8], [18.38477631085024, 18.384776310850235, 8]],
    [[7.0710678118654755, 7.071067811865475, -8], [7.0710678118654755, 7.071067811865475, 8], [18.38477631085024, 18.384776310850235, 8]],
    [[18.38477631085024, 18.384776310850235, 8], [18.38477631085024, 18.384776310850235, -8], [7.0710678118654755, 7.071067811865475, -8]],
    [[26, 0, 8], [10, 0, 8], [10, 0, -8]],
    [[10, 0, -8], [26, 0, -8], [26, 0, 8]]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 12)
  t.true(comparePolygonsAsPoints(pts, exp))

  geometry3 = extrudeRotate({ segments: 4, angle: -250 * 0.017453292519943295 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 28)

  geometry3 = extrudeRotate({ segments: 4, angle: 250 * 0.017453292519943295 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 28)
})

test('extrudeRotate: (startAngle) extruding of a geom2 produces an expected geom3', (t) => {
  const geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  // test startAngle
  let geometry3 = extrudeRotate({ segments: 5, startAngle: TAU / 8 }, geometry2)
  let pts = geom3.toPoints(geometry3)
  let exp = [
    [7.0710678118654755, 7.071067811865475, 8],
    [18.38477631085024, 18.384776310850235, 8],
    [-11.803752993228215, 23.166169628897567, 8]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 40)
  t.true(comparePoints(pts[0], exp))

  geometry3 = extrudeRotate({ segments: 5, startAngle: -TAU / 8 }, geometry2)
  pts = geom3.toPoints(geometry3)
  exp = [
    [7.0710678118654755, -7.071067811865475, 8],
    [18.38477631085024, -18.384776310850235, 8],
    [23.166169628897567, 11.803752993228215, 8]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 40)
  t.true(comparePoints(pts[0], exp))
})

test('extrudeRotate: (segments) extruding of a geom2 produces an expected geom3', (t) => {
  let geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  // test segments
  let geometry3 = extrudeRotate({ segments: 4 }, geometry2)
  let pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 32)

  geometry3 = extrudeRotate({ segments: 64 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 512)

  // test overlapping edges
  geometry2 = geom2.fromPoints([[0, 0], [2, 1], [1, 2], [1, 3], [3, 4], [0, 5]])
  geometry3 = extrudeRotate({ segments: 8 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 64)

  // test overlapping edges that produce hollow shape
  geometry2 = geom2.fromPoints([[30, 0], [30, 60], [0, 60], [0, 50], [10, 40], [10, 30], [0, 20], [0, 10], [10, 0]])
  geometry3 = extrudeRotate({ segments: 8 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 80)
})

test('extrudeRotate: (overlap +/-) extruding of a geom2 produces an expected geom3', (t) => {
  // overlap of Y axis; even number of + and - points
  let geometry = geom2.fromPoints([[-1, 8], [-1, -8], [7, -8], [7, 8]])

  let obs = extrudeRotate({ segments: 4, angle: TAU / 4 }, geometry)
  let pts = geom3.toPoints(obs)
  let exp = [
    [[0, 0, 8], [7, 0, 8], [0, 7, 8]],
    [[7, 0, -8], [0, 0, -8], [0, 7, -8]],
    [[7, 0, 8], [7, 0, -8], [0, 7, -8]],
    [[7, 0, 8], [0, 7, -8], [0, 7, 8]],
    [[0, 0, -8], [0, 0, 8], [0, 7, 8]],
    [[0, 7, 8], [0, 7, -8], [0, 0, -8]],
    [[7, 0, 8], [0, 0, 8], [0, 0, -8]],
    [[0, 0, -8], [7, 0, -8], [7, 0, 8]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 8)
  t.true(comparePolygonsAsPoints(pts, exp))

  // overlap of Y axis; larger number of - points
  geometry = geom2.fromPoints([[-1, 8], [-2, 4], [-1, -8], [7, -8], [7, 8]])

  obs = extrudeRotate({ segments: 8, angle: TAU / 4 }, geometry)
  pts = geom3.toPoints(obs)
  exp = [
    [[1, 0, -8], [0, 0, -8], [0.7071067811865476, 0.7071067811865475, -8]],
    [[2, 0, 4], [1, 0, -8], [0.7071067811865476, 0.7071067811865475, -8]],
    [[2, 0, 4], [0.7071067811865476, 0.7071067811865475, -8], [1.4142135623730951, 1.414213562373095, 4]],
    [[1, 0, 8], [2, 0, 4], [1.4142135623730951, 1.414213562373095, 4]],
    [[1, 0, 8], [1.4142135623730951, 1.414213562373095, 4], [0.7071067811865476, 0.7071067811865475, 8]],
    [[0, 0, 8], [1, 0, 8], [0.7071067811865476, 0.7071067811865475, 8]],
    [[0.7071067811865476, 0.7071067811865475, -8], [0, 0, -8], [0, 1, -8]],
    [[1.4142135623730951, 1.414213562373095, 4], [0.7071067811865476, 0.7071067811865475, -8], [0, 1, -8]],
    [[1.4142135623730951, 1.414213562373095, 4], [0, 1, -8], [0, 2, 4]],
    [[0.7071067811865476, 0.7071067811865475, 8], [1.4142135623730951, 1.414213562373095, 4], [0, 2, 4]],
    [[0.7071067811865476, 0.7071067811865475, 8], [0, 2, 4], [0, 1, 8]],
    [[0, 0, 8], [0.7071067811865476, 0.7071067811865475, 8], [0, 1, 8]],
    [[0, 1, -8], [0, 0, -8], [0, 0, 8]],
    [[0, 0, 8], [0, 1, 8], [0, 2, 4]],
    [[0, 2, 4], [0, 1, -8], [0, 0, 8]],
    [[0, 0, 8], [0, 0, -8], [1, 0, -8]],
    [[2, 0, 4], [1, 0, 8], [0, 0, 8]],
    [[0, 0, 8], [1, 0, -8], [2, 0, 4]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 18)
  t.true(comparePolygonsAsPoints(pts, exp))
})

// TEST HOLES
