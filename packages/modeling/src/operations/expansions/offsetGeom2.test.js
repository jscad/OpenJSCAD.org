import test from 'ava'

import { geom2 } from '../../geometries/index.js'

import { offset } from './index.js'

import { comparePoints } from '../../../test/helpers/index.js'

test('offset (options): offsetting of a simple geom2 produces expected offset geom2', (t) => {
  const geometry = geom2.create([[[-5, -5], [5, -5], [5, 5], [3, 5], [3, 0], [-3, 0], [-3, 5], [-5, 5]]])

  // empty
  const empty = geom2.create()
  let obs = offset({ delta: 1 }, empty)
  let pts = geom2.toPoints(obs)
  let exp = [
  ]
  t.notThrows(() => geom2.validate(obs))
  t.true(comparePoints(pts, exp))

  // expand +
  obs = offset({ delta: 1, corners: 'round' }, geometry)
  pts = geom2.toPoints(obs)
  exp = [
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
  t.true(comparePoints(pts, exp))

  // contract -
  obs = offset({ delta: -0.5, corners: 'round' }, geometry)
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
  const obs = offset({ delta: 2, corners: 'edge' }, geometry)
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
  t.is(pts.length, 16)
  t.true(comparePoints(pts, exp))
})
