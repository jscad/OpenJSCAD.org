import test from 'ava'

import { comparePoints, comparePolygonsAsPoints } from '../../../test/helpers/index.js'

import { TAU } from '../../maths/constants.js'

import { colorize } from '../../colors/index.js'

import { geom2, geom3 } from '../../geometries/index.js'

import { measureArea, measureVolume } from '../../measurements/index.js'

import { square } from '../../primitives/index.js'

import { extrudeRotate } from './index.js'

test('extrudeRotate: (defaults) extruding of a geom2 produces an expected geom3', (t) => {
  const geometry2 = geom2.create([[[10, 8], [10, -8], [26, -8], [26, 8]]])

  const geometry3 = extrudeRotate({ }, geometry2)
  const pts = geom3.toVertices(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureArea(geometry3), 7033.914479497244)
  t.is(measureVolume(geometry3), 27648.000000000007)
  t.is(pts.length, 96)
})

test('extrudeRotate: preserves color', (t) => {
  const red = colorize([1, 0, 0], square())
  const extruded = extrudeRotate({ }, red)
  t.deepEqual(extruded.color, [1, 0, 0, 1])
})

test('extrudeRotate: (angle) extruding of a geom2 produces an expected geom3', (t) => {
  const geometry2 = geom2.create([[[10, 8], [10, -8], [26, -8], [26, 8]]])

  // test angle
  let geometry3 = extrudeRotate({ segments: 4, angle: TAU / 8 }, geometry2)
  let pts = geom3.toVertices(geometry3)
  const exp = [
    [[26, 0, 8], [26, 0, -8], [18.38477631085024, 18.384776310850235, -8]],
    [[26, 0, 8], [18.38477631085024, 18.384776310850235, -8], [18.38477631085024, 18.384776310850235, 8]],
    [[26, 0, -8], [10, 0, -8], [7.0710678118654755, 7.071067811865475, -8]],
    [[26, 0, -8], [7.0710678118654755, 7.071067811865475, -8], [18.38477631085024, 18.384776310850235, -8]],
    [[10, 0, -8], [10, 0, 8], [7.0710678118654755, 7.071067811865475, 8]],
    [[10, 0, -8], [7.0710678118654755, 7.071067811865475, 8], [7.0710678118654755, 7.071067811865475, -8]],
    [[10, 0, 8], [26, 0, 8], [18.38477631085024, 18.384776310850235, 8]],
    [[10, 0, 8], [18.38477631085024, 18.384776310850235, 8], [7.0710678118654755, 7.071067811865475, 8]],
    [[7.0710678118654755, 7.071067811865475, -8], [7.0710678118654755, 7.071067811865475, 8], [18.38477631085024, 18.384776310850235, 8]],
    [[18.38477631085024, 18.384776310850235, 8], [18.38477631085024, 18.384776310850235, -8], [7.0710678118654755, 7.071067811865475, -8]],
    [[26, 0, 8], [10, 0, 8], [10, 0, -8]],
    [[10, 0, -8], [26, 0, -8], [26, 0, 8]]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureArea(geometry3), 1360.144820048035)
  t.is(measureVolume(geometry3), 3258.3480477076105)
  t.is(pts.length, 12)
  t.true(comparePolygonsAsPoints(pts, exp))

  geometry3 = extrudeRotate({ segments: 4, angle: -250 * 0.017453292519943295 }, geometry2)
  pts = geom3.toVertices(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureArea(geometry3), 4525.850393739846)
  t.is(measureVolume(geometry3), 13730.527057424617)
  t.is(pts.length, 28)

  geometry3 = extrudeRotate({ segments: 4, angle: 250 * 0.017453292519943295 }, geometry2)
  pts = geom3.toVertices(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureArea(geometry3), 4525.8503937398455)
  t.is(measureVolume(geometry3), 13730.527057424617)
  t.is(pts.length, 28)
})

test('extrudeRotate: (startAngle) extruding of a geom2 produces an expected geom3', (t) => {
  const geometry2 = geom2.create([[[10, 8], [10, -8], [26, -8], [26, 8]]])

  // test startAngle
  let geometry3 = extrudeRotate({ segments: 5, startAngle: TAU / 8 }, geometry2)
  let pts = geom3.toVertices(geometry3)
  let exp = [
    [7.0710678118654755, 7.071067811865475, 8],
    [18.38477631085024, 18.384776310850235, 8],
    [-11.803752993228215, 23.166169628897567, 8]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureArea(geometry3), 6124.6858201346895)
  t.is(measureVolume(geometry3), 21912.342135440336)
  t.is(pts.length, 40)
  t.true(comparePoints(pts[6], exp))

  geometry3 = extrudeRotate({ segments: 5, startAngle: -TAU / 8 }, geometry2)
  pts = geom3.toVertices(geometry3)
  exp = [
    [7.0710678118654755, -7.071067811865475, 8],
    [18.38477631085024, -18.384776310850235, 8],
    [23.166169628897567, 11.803752993228215, 8]
  ]
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureArea(geometry3), 6124.685820134688)
  t.is(measureVolume(geometry3), 21912.342135440336)
  t.is(pts.length, 40)
  t.true(comparePoints(pts[6], exp))
})

test('extrudeRotate: (segments) extruding of a geom2 produces an expected geom3', (t) => {
  let geometry2 = geom2.create([[[10, 8], [10, -8], [26, -8], [26, 8]]])

  // test segments
  let geometry3 = extrudeRotate({ segments: 4 }, geometry2)
  let pts = geom3.toVertices(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureArea(geometry3), 5562.34804770761)
  t.is(measureVolume(geometry3), 18432)
  t.is(pts.length, 32)

  geometry3 = extrudeRotate({ segments: 64 }, geometry2)
  pts = geom3.toVertices(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureArea(geometry3), 7230.965353920782)
  t.is(measureVolume(geometry3), 28906.430888871357)
  t.is(pts.length, 512)

  // test overlapping edges
  geometry2 = geom2.create([[[0, 0], [2, 1], [1, 2], [1, 3], [3, 4], [0, 5]]])
  geometry3 = extrudeRotate({ segments: 8 }, geometry2)
  pts = geom3.toVertices(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureArea(geometry3), 84.28200374166053)
  t.is(measureVolume(geometry3), 33.94112549695427)
  t.is(pts.length, 64)

  // test overlapping edges that produce hollow shape
  geometry2 = geom2.create([[[30, 0], [30, 60], [0, 60], [0, 50], [10, 40], [10, 30], [0, 20], [0, 10], [10, 0]]])
  geometry3 = extrudeRotate({ segments: 8 }, geometry2)
  pts = geom3.toVertices(geometry3)
  t.notThrows(() => geom3.validate(geometry3))
  t.is(measureArea(geometry3), 17692.315375839215)
  t.is(measureVolume(geometry3), 147078.2104868019)
  t.is(pts.length, 80)
})

test('extrudeRotate: (overlap +/-) extruding of a geom2 produces an expected geom3', (t) => {
  // overlap of Y axis; even number of + and - points
  let geometry = geom2.create([[[-1, 8], [-1, -8], [7, -8], [7, 8]]])

  let obs = extrudeRotate({ segments: 4, angle: TAU / 4 }, geometry)
  let pts = geom3.toVertices(obs)
  let exp = [
    [[0, 0, 8], [7, 0, 8], [0, 7, 8]],
    [[7, 0, 8], [7, 0, -8], [0, 7, -8]],
    [[7, 0, 8], [0, 7, -8], [0, 7, 8]],
    [[7, 0, -8], [0, 0, -8], [0, 7, -8]],
    [[0, 7, -8], [0, 0, -8], [0, 0, 8]],
    [[0, 0, 8], [0, 7, 8], [0, 7, -8]],
    [[0, 0, 8], [0, 0, -8], [7, 0, -8]],
    [[7, 0, -8], [7, 0, 8], [0, 0, 8]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 431.3919189857867)
  t.is(measureVolume(obs), 391.99999999999994)
  t.is(pts.length, 8)
  t.true(comparePolygonsAsPoints(pts, exp))

  // overlap of Y axis; larger number of - points
  geometry = geom2.create([[[-1, 8], [-2, 4], [-1, -8], [7, -8], [7, 8]]])

  obs = extrudeRotate({ segments: 8, angle: TAU / 4 }, geometry)
  pts = geom3.toVertices(obs)
  exp = [
    [[2, 0, 4], [1, 0, -8], [0.7071067811865476, 0.7071067811865475, -8]],
    [[2, 0, 4], [0.7071067811865476, 0.7071067811865475, -8], [1.4142135623730951, 1.414213562373095, 4]],
    [[1, 0, -8], [0, 0, -8], [0.7071067811865476, 0.7071067811865475, -8]],
    [[0, 0, 8], [1, 0, 8], [0.7071067811865476, 0.7071067811865475, 8]],
    [[1, 0, 8], [2, 0, 4], [1.4142135623730951, 1.414213562373095, 4]],
    [[1, 0, 8], [1.4142135623730951, 1.414213562373095, 4], [0.7071067811865476, 0.7071067811865475, 8]],
    [[1.4142135623730951, 1.414213562373095, 4], [0.7071067811865476, 0.7071067811865475, -8], [0, 1, -8]],
    [[1.4142135623730951, 1.414213562373095, 4], [0, 1, -8], [0, 2, 4]],
    [[0.7071067811865476, 0.7071067811865475, -8], [0, 0, -8], [0, 1, -8]],
    [[0, 0, 8], [0.7071067811865476, 0.7071067811865475, 8], [0, 1, 8]],
    [[0.7071067811865476, 0.7071067811865475, 8], [1.4142135623730951, 1.414213562373095, 4], [0, 2, 4]],
    [[0.7071067811865476, 0.7071067811865475, 8], [0, 2, 4], [0, 1, 8]],
    [[0, 0, 8], [0, 1, 8], [0, 2, 4]],
    [[0, 2, 4], [0, 1, -8], [0, 0, -8]],
    [[0, 0, -8], [0, 0, 8], [0, 2, 4]],
    [[2, 0, 4], [1, 0, 8], [0, 0, 8]],
    [[0, 0, -8], [1, 0, -8], [2, 0, 4]],
    [[2, 0, 4], [0, 0, 8], [0, 0, -8]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 86.47516025670329)
  t.is(measureVolume(obs), 26.398653164297773)
  t.is(pts.length, 18)
  t.true(comparePolygonsAsPoints(pts, exp))
})

// Test for mat4 reuse optimization: verify rotation matrices are computed correctly
// This ensures the optimization of computing xRotationMatrix once doesn't break anything
test('extrudeRotate: (mat4 reuse) rotation matrices produce correct geometry', (t) => {
  // Simple rectangle that will be rotated to form a tube-like shape
  const geometry2 = geom2.create([[ [6, 1], [5, 1], [5, -1], [6, -1] ]])

  // Full rotation with many segments to test matrix reuse across iterations
  const geometry3 = extrudeRotate({ segments: 32 }, geometry2)
  const pts = geom3.toVertices(geometry3)

  t.notThrows(() => geom3.validate(geometry3))
  // 32 segments * 8 walls per segment (4 edges * 2 triangles) = 256 polygons
  t.is(pts.length, 256)

  // Verify the geometry is closed (first and last slices connect properly)
  // This tests the Zrotation rounding error fix at index === segments
  const obs = extrudeRotate({ segments: 16 }, geometry2)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 204.69587079560992)
  t.is(measureVolume(obs), 67.35228409625583)
})

// Test for mat4 reuse with partial rotation (tests both capped and matrix reuse)
test('extrudeRotate: (mat4 reuse) partial rotation produces correct caps', (t) => {
  const geometry2 = geom2.create([[ [6, 1], [5, 1], [5, -1], [6, -1] ]])

  // Quarter rotation - should have start and end caps
  const obs = extrudeRotate({ segments: 8, angle: TAU / 4 }, geometry2)
  const pts = geom3.toVertices(obs)

  t.notThrows(() => geom3.validate(obs))
  t.is(measureArea(obs), 53.232491234231944)
  t.is(measureVolume(obs), 15.556349186104049)
})

// TEST HOLES
