import test from 'ava'

import { colorize } from '../../colors/index.js'
import { geom2 } from '../../geometries/index.js'
import { measureArea } from '../../measurements/index.js'
import { roundedRectangle, square } from '../../primitives/index.js'

import { offset } from './index.js'

import { comparePoints } from '../../../test/helpers/index.js'

test('offset: offset an empty geom2', (t) => {
  const empty = geom2.create()
  const result = offset({ delta: 1 }, empty)
  t.notThrows(() => geom2.validate(result))
  t.is(measureArea(result), 0)
  t.is(geom2.toPoints(result).length, 0)
})

test('offset: offset option validation', (t) => {
  const empty = geom2.create()
  t.throws(() => offset({ delta: null }, empty), { message: 'delta must be a finite number' })
  t.throws(() => offset({ delta: undefined }, empty), { message: 'delta must be a finite number' })
  t.throws(() => offset({ delta: Infinity }, empty), { message: 'delta must be a finite number' })
  t.throws(() => offset({ delta: NaN }, empty), { message: 'delta must be a finite number' })
  t.throws(() => offset({ corners: 'round', segments: null }, empty), { message: 'segments must be a finite number' })
  t.throws(() => offset({ corners: 'round', segments: undefined }, empty), { message: 'segments must be a finite number' })
  t.throws(() => offset({ corners: 'round', segments: Infinity }, empty), { message: 'segments must be a finite number' })
  t.throws(() => offset({ corners: 'round', segments: NaN }, empty), { message: 'segments must be a finite number' })
  t.throws(() => offset({ corners: 'round', segments: 0 }, empty), { message: 'segments must be greater than zero' })
  t.throws(() => offset({ corners: 'round', segments: -1 }, empty), { message: 'segments must be greater than zero' })
  t.throws(() => offset({ corners: null }, empty), { message: 'corners must be "edge", "chamfer", or "round"' })
  t.throws(() => offset({ corners: undefined }, empty), { message: 'corners must be "edge", "chamfer", or "round"' })
  t.throws(() => offset({ corners: 4 }, empty), { message: 'corners must be "edge", "chamfer", or "round"' })
  t.throws(() => offset({ corners: 'fluffy' }, empty), { message: 'corners must be "edge", "chamfer", or "round"' })
})

test('offset: offset geom2 preserves color', (t) => {
  const geometry = colorize([1, 0, 0], square({ }))
  const result = offset({ }, geometry)
  t.deepEqual(result.color, [1, 0, 0, 1])
})

test('offset: offset of a geom2 produces expected changes to points', (t) => {
  const geometry = square({ size: 16 })

  const obs = offset({ delta: 2, corners: 'round', segments: 8 }, geometry)
  const pts = geom2.toPoints(obs)
  const exp = [
    [-9.414213562373096, -9.414213562373096],
    [-8, -10],
    [8, -10],
    [9.414213562373096, -9.414213562373096],
    [10, -8],
    [10, 8],
    [9.414213562373096, 9.414213562373096],
    [8, 10],
    [-8, 10],
    [-9.414213562373096, 9.414213562373096],
    [-10, 8],
    [-10, -8]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 395.3137084989848)
  t.is(pts.length, 12)
  t.true(comparePoints(pts, exp))
})

test('offset (options): offsetting of a simple geom2 produces expected offset geom2', (t) => {
  const geometry = geom2.create([
    [[-5, -5], [5, -5], [5, 5], [3, 5], [3, 0], [-3, 0], [-3, 5], [-5, 5]]
  ])

  // expand +
  let obs = offset({ delta: 1, corners: 'round', segments: 4 }, geometry)
  let pts = geom2.toPoints(obs)
  let exp = [
    [-5, -6],
    [5, -6],
    [6, -5],
    [6, 5],
    [5, 6],
    [3, 6],
    [2, 5],
    [2, 1],
    [-2, 1],
    [-2, 5],
    [-3, 6],
    [-5, 6],
    [-6, 5],
    [-6, -5]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 121)
  t.is(pts.length, 14)
  t.true(comparePoints(pts, exp))

  // contract -
  obs = offset({ delta: -0.5, corners: 'round', segments: 4 }, geometry)
  pts = geom2.toPoints(obs)
  exp = [
    [-4.5, -4.5],
    [4.5, -4.5],
    [4.5, 4.5],
    [3.5, 4.5],
    [3.5, -3.0616171314629196e-17],
    [3, -0.5],
    [-3, -0.5],
    [-3.5, 3.0616171314629196e-17],
    [-3.5, 4.5],
    [-4.5, 4.5]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 46.25)
  t.is(pts.length, 10)
  t.true(comparePoints(pts, exp))

  // segments 1 - sharp points at corner
  obs = offset({ delta: 1, corners: 'edge' }, geometry)
  pts = geom2.toPoints(obs)
  exp = [
    [6, -6],
    [6, 6],
    [2, 6],
    [2, 1],
    [-2, 1],
    [-1.9999999999999996, 6],
    [-6, 6],
    [-6, -6]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 124)
  t.is(pts.length, 8)
  t.true(comparePoints(pts, exp))

  // segments 16 - rounded corners
  obs = offset({ delta: -0.5, corners: 'round', segments: 16 }, geometry)
  pts = geom2.toPoints(obs)
  exp = [
    [-4.5, -4.5],
    [4.5, -4.5],
    [4.5, 4.5],
    [3.5, 4.5],
    [3.5, -3.061616997868383e-17],
    [3.4619397662556435, -0.19134171618254492],
    [3.353553390593274, -0.3535533905932738],
    [3.191341716182545, -0.46193976625564337],
    [3, -0.5],
    [-3, -0.5],
    [-3.191341716182545, -0.46193976625564337],
    [-3.353553390593274, -0.3535533905932738],
    [-3.4619397662556435, -0.19134171618254495],
    [-3.5, 3.061616997868383e-17],
    [-3.5, 4.5],
    [-4.5, 4.5]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 46.1173165676349)
  t.is(pts.length, 16)
  t.true(comparePoints(pts, exp))
})

test('offset (options): offsetting of a complex geom2 produces expected offset geom2', (t) => {
  const geometry = geom2.create([
    [
      [-75, -75],
      [75, -75],
      [75, 75],
      [40, 75],
      [40, 0],
      [-40, 0],
      [-40, 75],
      [-75, 75]
    ],
    [
      [15, -40],
      [8, -40],
      [8, -25],
      [-8, -25],
      [-8, -40],
      [-15, -40],
      [-15, -10],
      [15, -10]
    ],
    [[-2, -19], [2, -19], [2, -15], [-2, -15]]
  ])

  // expand +
  const obs = offset({ delta: 2, corners: 'edge', expandHoles: true }, geometry)
  const pts = geom2.toPoints(obs)
  const exp = [
    [77, -77],
    [77, 77],
    [38, 77],
    [38, 2],
    [-38, 2],
    [-37.99999999999999, 77],
    [-77, 77],
    [-77, -77],
    [13, -38],
    [10, -38],
    [10, -23],
    [-10, -23],
    [-10, -38],
    [-13, -38],
    [-13, -12],
    [13, -12],
    [3.9999999999999996, -21],
    [4, -13],
    [-4, -13],
    [-4, -21]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 17704)
  t.is(pts.length, 20)
  t.true(comparePoints(pts, exp))
})

test('offset (options): offsetting of round geom2 produces expected offset geom2', (t) => {
  const geometry = geom2.create([[
    [10.00000, 0.00000],
    [9.23880, 3.82683],
    [7.07107, 7.07107],
    [3.82683, 9.23880],
    [0.00000, 10.00000],
    [-3.82683, 9.23880],
    [-7.07107, 7.07107],
    [-9.23880, 3.82683],
    [-10.00000, 0.00000],
    [-9.23880, -3.82683],
    [-7.07107, -7.07107],
    [-3.82683, -9.23880],
    [-0.00000, -10.00000],
    [3.82683, -9.23880],
    [7.07107, -7.07107],
    [9.23880, -3.82683]
  ]])

  const obs = offset({ delta: -0.5, corners: 'round' }, geometry)
  const pts = geom2.toPoints(obs)
  const exp = [
    [9.490204518135641, 0],
    [8.767810140100096, 3.6317399864658007],
    [6.710590060510285, 6.7105900605102855],
    [3.6317399864658024, 8.767810140100096],
    [-4.440892098500626e-16, 9.490204518135641],
    [-3.6317399864658007, 8.767810140100096],
    [-6.7105900605102855, 6.710590060510285],
    [-8.767810140100096, 3.6317399864658024],
    [-9.490204518135641, -4.440892098500626e-16],
    [-8.767810140100096, -3.6317399864658007],
    [-6.710590060510285, -6.7105900605102855],
    [-3.6317399864658024, -8.767810140100096],
    [4.440892098500626e-16, -9.490204518135641],
    [3.6317399864658007, -8.767810140100096],
    [6.7105900605102855, -6.710590060510285],
    [8.767810140100096, -3.6317399864658024]
  ]
  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 275.72806620525375)
  t.is(pts.length, 16)
  t.true(comparePoints(pts, exp))
})

test('offset (options): offsetting issue #1017', (t) => {
  const geometry = roundedRectangle({ size: [10, 10], segments: 4 })
  const obs = offset({ delta: -2, corners: 'round' }, geometry)
  t.notThrows.skip(() => geom2.validate(obs))
})
