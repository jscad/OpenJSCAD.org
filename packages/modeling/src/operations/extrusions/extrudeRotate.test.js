const test = require('ava')

const { comparePoints, comparePolygonsAsPoints } = require('../../../test/helpers')

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
  let geometry3 = extrudeRotate({ segments: 4, angle: Math.PI / 4 }, geometry2)
  let pts = geom3.toPoints(geometry3)
  const exp = [
    [[10, 4.898587196589413e-16, 8], [26, 4.898587196589413e-16, 8], [18.38477631085024, 18.384776310850235, 8]],
    [[10, 4.898587196589413e-16, 8], [18.38477631085024, 18.384776310850235, 8], [7.0710678118654755, 7.071067811865475, 8]],
    [[10, -4.898587196589413e-16, -8], [10, 4.898587196589413e-16, 8], [7.0710678118654755, 7.071067811865475, 8]],
    [[10, -4.898587196589413e-16, -8], [7.0710678118654755, 7.071067811865475, 8], [7.0710678118654755, 7.071067811865475, -8]],
    [[26, -4.898587196589413e-16, -8], [10, -4.898587196589413e-16, -8], [7.0710678118654755, 7.071067811865475, -8]],
    [[26, -4.898587196589413e-16, -8], [7.0710678118654755, 7.071067811865475, -8], [18.38477631085024, 18.384776310850235, -8]],
    [[26, 4.898587196589413e-16, 8], [26, -4.898587196589413e-16, -8], [18.38477631085024, 18.384776310850235, -8]],
    [[26, 4.898587196589413e-16, 8], [18.38477631085024, 18.384776310850235, -8], [18.38477631085024, 18.384776310850235, 8]],
    [[7.071067811865476, 7.0710678118654755, -8], [7.071067811865476, 7.0710678118654755, 8], [18.384776310850242, 18.384776310850235, 8]],
    [[18.384776310850242, 18.384776310850235, 8], [18.384776310850242, 18.384776310850235, -8], [7.071067811865476, 7.0710678118654755, -8]],
    [[26, 4.898587196589413e-16, 8], [10, 4.898587196589413e-16, 8], [10, -4.898587196589413e-16, -8]],
    [[10, -4.898587196589413e-16, -8], [26, -4.898587196589413e-16, -8], [26, 4.898587196589413e-16, 8]]
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
  let geometry3 = extrudeRotate({ segments: 5, startAngle: Math.PI / 4 }, geometry2)
  let pts = geom3.toPoints(geometry3)
  let exp = [
    [7.0710678118654755, 7.071067811865475, 8],
    [18.38477631085024, 18.384776310850235, 8],
    [-11.803752993228215, 23.166169628897567, 8]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(pts.length, 40)
  t.true(comparePoints(pts[0], exp))

  geometry3 = extrudeRotate({ segments: 5, startAngle: Math.PI / -4 }, geometry2)
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
  t.notThrows.skip(() => geom3.validate(geometry3))
  t.is(pts.length, 64)

  // test overlapping edges that produce hollow shape
  geometry2 = geom2.fromPoints([[30, 0], [30, 60], [0, 60], [0, 50], [10, 40], [10, 30], [0, 20], [0, 10], [10, 0]])
  geometry3 = extrudeRotate({ segments: 8 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.notThrows.skip(() => geom3.validate(geometry3))
  t.is(pts.length, 80)
})

test('extrudeRotate: (overlap +/-) extruding of a geom2 produces an expected geom3', (t) => {
  // overlap of Y axis; even number of + and - points
  let geometry = geom2.fromPoints([[-1, 8], [-1, -8], [7, -8], [7, 8]])

  let obs = extrudeRotate({ segments: 4, angle: Math.PI / 2 }, geometry)
  let pts = geom3.toPoints(obs)
  let exp = [
    [[0, 4.898587196589413e-16, 8], [7, 4.898587196589413e-16, 8], [-6.123233995736767e-17, 7, 8]],
    [[7, -4.898587196589413e-16, -8], [4.898587196589413e-16, -2.999519565323715e-32, -8], [9.184850993605148e-16, 7, -8]],
    [[7, 4.898587196589413e-16, 8], [7, -4.898587196589413e-16, -8], [9.184850993605148e-16, 7, -8]],
    [[7, 4.898587196589413e-16, 8], [9.184850993605148e-16, 7, -8], [-6.123233995736767e-17, 7, 8]],
    [[4.898587196589413e-16, -2.999519565323715e-32, -8], [-4.898587196589413e-16, 2.999519565323715e-32, 8], [-6.123233995736767e-17, 7, 8]],
    [[-6.123233995736767e-17, 7, 8], [9.184850993605148e-16, 7, -8], [4.898587196589413e-16, -2.999519565323715e-32, -8]],
    [[7, 4.898587196589413e-16, 8], [0, 4.898587196589413e-16, 8], [0, -4.898587196589413e-16, -8]],
    [[0, -4.898587196589413e-16, -8], [7, -4.898587196589413e-16, -8], [7, 4.898587196589413e-16, 8]]
  ]
  t.notThrows.skip(() => geom3.validate(obs))
  t.is(pts.length, 8)
  t.true(comparePolygonsAsPoints(pts, exp))

  // overlap of Y axis; larger number of - points
  geometry = geom2.fromPoints([[-1, 8], [-2, 4], [-1, -8], [7, -8], [7, 8]])

  obs = extrudeRotate({ segments: 8, angle: Math.PI / 2 }, geometry)
  pts = geom3.toPoints(obs)
  exp = [
    [[1, -4.898587196589413e-16, -8], [3.4638242249419727e-16, -3.4638242249419736e-16, -8], [0.7071067811865479, 0.7071067811865471, -8]],
    [[2, 2.4492935982947064e-16, 4], [1, -4.898587196589413e-16, -8], [0.7071067811865479, 0.7071067811865471, -8]],
    [[2, 2.4492935982947064e-16, 4], [0.7071067811865479, 0.7071067811865471, -8], [1.414213562373095, 1.4142135623730951, 4]],
    [[1, 4.898587196589413e-16, 8], [2, 2.4492935982947064e-16, 4], [1.414213562373095, 1.4142135623730951, 4]],
    [[1, 4.898587196589413e-16, 8], [1.414213562373095, 1.4142135623730951, 4], [0.7071067811865472, 0.7071067811865478, 8]],
    [[0, 4.898587196589413e-16, 8], [1, 4.898587196589413e-16, 8], [0.7071067811865472, 0.7071067811865478, 8]],
    [[0.7071067811865479, 0.7071067811865471, -8], [4.898587196589413e-16, -2.999519565323715e-32, -8], [5.51091059616309e-16, 1, -8]],
    [[1.414213562373095, 1.4142135623730951, 4], [0.7071067811865479, 0.7071067811865471, -8], [5.51091059616309e-16, 1, -8]],
    [[1.414213562373095, 1.4142135623730951, 4], [5.51091059616309e-16, 1, -8], [-1.2246467991473532e-16, 2, 4]],
    [[0.7071067811865472, 0.7071067811865478, 8], [1.414213562373095, 1.4142135623730951, 4], [-1.2246467991473532e-16, 2, 4]],
    [[0.7071067811865472, 0.7071067811865478, 8], [-1.2246467991473532e-16, 2, 4], [-4.286263797015736e-16, 1, 8]],
    [[-3.4638242249419727e-16, 3.4638242249419736e-16, 8], [0.7071067811865472, 0.7071067811865478, 8], [-4.286263797015736e-16, 1, 8]],
    [[5.51091059616309e-16, 1, -8], [4.898587196589413e-16, -2.999519565323715e-32, -8], [-4.898587196589415e-16, 2.9995195653237163e-32, 8]],
    [[-4.898587196589415e-16, 2.9995195653237163e-32, 8], [-4.286263797015738e-16, 1, 8], [-1.2246467991473544e-16, 2, 4]],
    [[-1.2246467991473544e-16, 2, 4], [5.51091059616309e-16, 1, -8], [-4.898587196589415e-16, 2.9995195653237163e-32, 8]],
    [[0, 4.898587196589413e-16, 8], [0, -4.898587196589413e-16, -8], [1, -4.898587196589413e-16, -8]],
    [[2, 2.4492935982947064e-16, 4], [1, 4.898587196589413e-16, 8], [0, 4.898587196589413e-16, 8]],
    [[0, 4.898587196589413e-16, 8], [1, -4.898587196589413e-16, -8], [2, 2.4492935982947064e-16, 4]]
  ]
  t.notThrows.skip(() => geom3.validate(obs))
  t.is(pts.length, 18)
  t.true(comparePolygonsAsPoints(pts, exp))
})

// TEST HOLES
