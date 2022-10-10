import test from 'ava'

import { geom3 } from '../geometries/index.js'

import { ellipsoid } from './index.js'

import { comparePolygonsAsPoints } from '../../test/helpers/index.js'

test('ellipsoid (defaults)', (t) => {
  const obs = ellipsoid()
  const pts = geom3.toPoints(obs)

  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 512)
})

test('ellipsoid (options)', (t) => {
  // test radius
  let obs = ellipsoid({ radius: [3, 5, 7], segments: 12 })
  let pts = geom3.toPoints(obs)
  let exp = [
    [[3, 0, 0], [2.598076211353316, -2.4999999999999996, 0],
      [2.25, -2.1650635094610964, -3.4999999999999996], [2.598076211353316, 0, -3.4999999999999996]],
    [[2.598076211353316, 0, 3.4999999999999996], [2.25, -2.1650635094610964, 3.4999999999999996],
      [2.598076211353316, -2.4999999999999996, 0], [3, 0, 0]],
    [[2.598076211353316, 0, -3.4999999999999996], [2.25, -2.1650635094610964, -3.4999999999999996],
      [1.2990381056766582, -1.25, -6.06217782649107], [1.5000000000000004, 0, -6.06217782649107]],
    [[1.5000000000000004, 0, 6.06217782649107], [1.2990381056766582, -1.25, 6.06217782649107],
      [2.25, -2.1650635094610964, 3.4999999999999996], [2.598076211353316, 0, 3.4999999999999996]],
    [[1.5000000000000004, 0, -6.06217782649107], [1.2990381056766582, -1.25, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [1.2990381056766582, -1.25, 6.06217782649107], [1.5000000000000004, 0, 6.06217782649107]],
    [[2.598076211353316, -2.4999999999999996, 0], [1.5000000000000004, -4.330127018922193, 0],
      [1.2990381056766584, -3.75, -3.4999999999999996], [2.25, -2.1650635094610964, -3.4999999999999996]],
    [[2.25, -2.1650635094610964, 3.4999999999999996], [1.2990381056766584, -3.75, 3.4999999999999996],
      [1.5000000000000004, -4.330127018922193, 0], [2.598076211353316, -2.4999999999999996, 0]],
    [[2.25, -2.1650635094610964, -3.4999999999999996], [1.2990381056766584, -3.75, -3.4999999999999996],
      [0.7500000000000004, -2.165063509461097, -6.06217782649107], [1.2990381056766582, -1.25, -6.06217782649107]],
    [[1.2990381056766582, -1.25, 6.06217782649107], [0.7500000000000004, -2.165063509461097, 6.06217782649107],
      [1.2990381056766584, -3.75, 3.4999999999999996], [2.25, -2.1650635094610964, 3.4999999999999996]],
    [[1.2990381056766582, -1.25, -6.06217782649107], [0.7500000000000004, -2.165063509461097, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [0.7500000000000004, -2.165063509461097, 6.06217782649107], [1.2990381056766582, -1.25, 6.06217782649107]],
    [[1.5000000000000004, -4.330127018922193, 0], [0, -5, 0],
      [0, -4.330127018922194, -3.4999999999999996], [1.2990381056766584, -3.75, -3.4999999999999996]],
    [[1.2990381056766584, -3.75, 3.4999999999999996], [0, -4.330127018922194, 3.4999999999999996],
      [0, -5, 0], [1.5000000000000004, -4.330127018922193, 0]],
    [[1.2990381056766584, -3.75, -3.4999999999999996], [0, -4.330127018922194, -3.4999999999999996],
      [0, -2.5000000000000004, -6.06217782649107], [0.7500000000000004, -2.165063509461097, -6.06217782649107]],
    [[0.7500000000000004, -2.165063509461097, 6.06217782649107], [0, -2.5000000000000004, 6.06217782649107],
      [0, -4.330127018922194, 3.4999999999999996], [1.2990381056766584, -3.75, 3.4999999999999996]],
    [[0.7500000000000004, -2.165063509461097, -6.06217782649107], [0, -2.5000000000000004, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [0, -2.5000000000000004, 6.06217782649107], [0.7500000000000004, -2.165063509461097, 6.06217782649107]],
    [[0, -5, 0], [-1.4999999999999993, -4.330127018922194, 0],
      [-1.2990381056766576, -3.7500000000000004, -3.4999999999999996], [0, -4.330127018922194, -3.4999999999999996]],
    [[0, -4.330127018922194, 3.4999999999999996], [-1.2990381056766576, -3.7500000000000004, 3.4999999999999996],
      [-1.4999999999999993, -4.330127018922194, 0], [0, -5, 0]],
    [[0, -4.330127018922194, -3.4999999999999996], [-1.2990381056766576, -3.7500000000000004, -3.4999999999999996],
      [-0.7499999999999998, -2.1650635094610973, -6.06217782649107], [0, -2.5000000000000004, -6.06217782649107]],
    [[0, -2.5000000000000004, 6.06217782649107], [-0.7499999999999998, -2.1650635094610973, 6.06217782649107],
      [-1.2990381056766576, -3.7500000000000004, 3.4999999999999996], [0, -4.330127018922194, 3.4999999999999996]],
    [[0, -2.5000000000000004, -6.06217782649107], [-0.7499999999999998, -2.1650635094610973, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [-0.7499999999999998, -2.1650635094610973, 6.06217782649107], [0, -2.5000000000000004, 6.06217782649107]],
    [[-1.4999999999999993, -4.330127018922194, 0], [-2.598076211353316, -2.4999999999999996, 0],
      [-2.25, -2.1650635094610964, -3.4999999999999996], [-1.2990381056766576, -3.7500000000000004, -3.4999999999999996]],
    [[-1.2990381056766576, -3.7500000000000004, 3.4999999999999996], [-2.25, -2.1650635094610964, 3.4999999999999996],
      [-2.598076211353316, -2.4999999999999996, 0], [-1.4999999999999993, -4.330127018922194, 0]],
    [[-1.2990381056766576, -3.7500000000000004, -3.4999999999999996], [-2.25, -2.1650635094610964, -3.4999999999999996],
      [-1.2990381056766582, -1.25, -6.06217782649107], [-0.7499999999999998, -2.1650635094610973, -6.06217782649107]],
    [[-0.7499999999999998, -2.1650635094610973, 6.06217782649107], [-1.2990381056766582, -1.25, 6.06217782649107],
      [-2.25, -2.1650635094610964, 3.4999999999999996], [-1.2990381056766576, -3.7500000000000004, 3.4999999999999996]],
    [[-0.7499999999999998, -2.1650635094610973, -6.06217782649107], [-1.2990381056766582, -1.25, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [-1.2990381056766582, -1.25, 6.06217782649107], [-0.7499999999999998, -2.1650635094610973, 6.06217782649107]],
    [[-2.598076211353316, -2.4999999999999996, 0], [-3, 0, 0],
      [-2.598076211353316, 0, -3.4999999999999996], [-2.25, -2.1650635094610964, -3.4999999999999996]],
    [[-2.25, -2.1650635094610964, 3.4999999999999996], [-2.598076211353316, 0, 3.4999999999999996],
      [-3, 0, 0], [-2.598076211353316, -2.4999999999999996, 0]],
    [[-2.25, -2.1650635094610964, -3.4999999999999996], [-2.598076211353316, 0, -3.4999999999999996],
      [-1.5000000000000004, 0, -6.06217782649107], [-1.2990381056766582, -1.25, -6.06217782649107]],
    [[-1.2990381056766582, -1.25, 6.06217782649107], [-1.5000000000000004, 0, 6.06217782649107],
      [-2.598076211353316, 0, 3.4999999999999996], [-2.25, -2.1650635094610964, 3.4999999999999996]],
    [[-1.2990381056766582, -1.25, -6.06217782649107], [-1.5000000000000004, 0, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [-1.5000000000000004, 0, 6.06217782649107], [-1.2990381056766582, -1.25, 6.06217782649107]],
    [[-3, 0, 0], [-2.5980762113533165, 2.4999999999999987, 0],
      [-2.2500000000000004, 2.1650635094610955, -3.4999999999999996], [-2.598076211353316, 0, -3.4999999999999996]],
    [[-2.598076211353316, 0, 3.4999999999999996], [-2.2500000000000004, 2.1650635094610955, 3.4999999999999996],
      [-2.5980762113533165, 2.4999999999999987, 0], [-3, 0, 0]],
    [[-2.598076211353316, 0, -3.4999999999999996], [-2.2500000000000004, 2.1650635094610955, -3.4999999999999996],
      [-1.2990381056766584, 1.2499999999999996, -6.06217782649107], [-1.5000000000000004, 0, -6.06217782649107]],
    [[-1.5000000000000004, 0, 6.06217782649107], [-1.2990381056766584, 1.2499999999999996, 6.06217782649107],
      [-2.2500000000000004, 2.1650635094610955, 3.4999999999999996], [-2.598076211353316, 0, 3.4999999999999996]],
    [[-1.5000000000000004, 0, -6.06217782649107], [-1.2990381056766584, 1.2499999999999996, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [-1.2990381056766584, 1.2499999999999996, 6.06217782649107], [-1.5000000000000004, 0, 6.06217782649107]],
    [[-2.5980762113533165, 2.4999999999999987, 0], [-1.5000000000000013, 4.330127018922193, 0],
      [-1.2990381056766591, 3.75, -3.4999999999999996], [-2.2500000000000004, 2.1650635094610955, -3.4999999999999996]],
    [[-2.2500000000000004, 2.1650635094610955, 3.4999999999999996], [-1.2990381056766591, 3.75, 3.4999999999999996],
      [-1.5000000000000013, 4.330127018922193, 0], [-2.5980762113533165, 2.4999999999999987, 0]],
    [[-2.2500000000000004, 2.1650635094610955, -3.4999999999999996], [-1.2990381056766591, 3.75, -3.4999999999999996],
      [-0.7500000000000009, 2.165063509461097, -6.06217782649107], [-1.2990381056766584, 1.2499999999999996, -6.06217782649107]],
    [[-1.2990381056766584, 1.2499999999999996, 6.06217782649107], [-0.7500000000000009, 2.165063509461097, 6.06217782649107],
      [-1.2990381056766591, 3.75, 3.4999999999999996], [-2.2500000000000004, 2.1650635094610955, 3.4999999999999996]],
    [[-1.2990381056766584, 1.2499999999999996, -6.06217782649107], [-0.7500000000000009, 2.165063509461097, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [-0.7500000000000009, 2.165063509461097, 6.06217782649107], [-1.2990381056766584, 1.2499999999999996, 6.06217782649107]],
    [[-1.5000000000000013, 4.330127018922193, 0], [0, 5, 0],
      [0, 4.330127018922194, -3.4999999999999996], [-1.2990381056766591, 3.75, -3.4999999999999996]],
    [[-1.2990381056766591, 3.75, 3.4999999999999996], [0, 4.330127018922194, 3.4999999999999996],
      [0, 5, 0], [-1.5000000000000013, 4.330127018922193, 0]],
    [[-1.2990381056766591, 3.75, -3.4999999999999996], [0, 4.330127018922194, -3.4999999999999996],
      [0, 2.5000000000000004, -6.06217782649107], [-0.7500000000000009, 2.165063509461097, -6.06217782649107]],
    [[-0.7500000000000009, 2.165063509461097, 6.06217782649107], [0, 2.5000000000000004, 6.06217782649107],
      [0, 4.330127018922194, 3.4999999999999996], [-1.2990381056766591, 3.75, 3.4999999999999996]],
    [[-0.7500000000000009, 2.165063509461097, -6.06217782649107], [0, 2.5000000000000004, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [0, 2.5000000000000004, 6.06217782649107], [-0.7500000000000009, 2.165063509461097, 6.06217782649107]],
    [[0, 5, 0], [1.5000000000000004, 4.330127018922193, 0],
      [1.2990381056766584, 3.75, -3.4999999999999996], [0, 4.330127018922194, -3.4999999999999996]],
    [[0, 4.330127018922194, 3.4999999999999996], [1.2990381056766584, 3.75, 3.4999999999999996],
      [1.5000000000000004, 4.330127018922193, 0], [0, 5, 0]],
    [[0, 4.330127018922194, -3.4999999999999996], [1.2990381056766584, 3.75, -3.4999999999999996],
      [0.7500000000000004, 2.165063509461097, -6.06217782649107], [0, 2.5000000000000004, -6.06217782649107]],
    [[0, 2.5000000000000004, 6.06217782649107], [0.7500000000000004, 2.165063509461097, 6.06217782649107],
      [1.2990381056766584, 3.75, 3.4999999999999996], [0, 4.330127018922194, 3.4999999999999996]],
    [[0, 2.5000000000000004, -6.06217782649107], [0.7500000000000004, 2.165063509461097, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [0.7500000000000004, 2.165063509461097, 6.06217782649107], [0, 2.5000000000000004, 6.06217782649107]],
    [[1.5000000000000004, 4.330127018922193, 0], [2.598076211353315, 2.500000000000002, 0],
      [2.2499999999999996, 2.1650635094610986, -3.4999999999999996], [1.2990381056766584, 3.75, -3.4999999999999996]],
    [[1.2990381056766584, 3.75, 3.4999999999999996], [2.2499999999999996, 2.1650635094610986, 3.4999999999999996],
      [2.598076211353315, 2.500000000000002, 0], [1.5000000000000004, 4.330127018922193, 0]],
    [[1.2990381056766584, 3.75, -3.4999999999999996], [2.2499999999999996, 2.1650635094610986, -3.4999999999999996],
      [1.2990381056766578, 1.2500000000000013, -6.06217782649107], [0.7500000000000004, 2.165063509461097, -6.06217782649107]],
    [[0.7500000000000004, 2.165063509461097, 6.06217782649107], [1.2990381056766578, 1.2500000000000013, 6.06217782649107],
      [2.2499999999999996, 2.1650635094610986, 3.4999999999999996], [1.2990381056766584, 3.75, 3.4999999999999996]],
    [[0.7500000000000004, 2.165063509461097, -6.06217782649107], [1.2990381056766578, 1.2500000000000013, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [1.2990381056766578, 1.2500000000000013, 6.06217782649107], [0.7500000000000004, 2.165063509461097, 6.06217782649107]],
    [[2.598076211353315, 2.500000000000002, 0], [3, 0, 0],
      [2.598076211353316, 0, -3.4999999999999996], [2.2499999999999996, 2.1650635094610986, -3.4999999999999996]],
    [[2.2499999999999996, 2.1650635094610986, 3.4999999999999996], [2.598076211353316, 0, 3.4999999999999996],
      [3, 0, 0], [2.598076211353315, 2.500000000000002, 0]],
    [[2.2499999999999996, 2.1650635094610986, -3.4999999999999996], [2.598076211353316, 0, -3.4999999999999996],
      [1.5000000000000004, 0, -6.06217782649107], [1.2990381056766578, 1.2500000000000013, -6.06217782649107]],
    [[1.2990381056766578, 1.2500000000000013, 6.06217782649107], [1.5000000000000004, 0, 6.06217782649107],
      [2.598076211353316, 0, 3.4999999999999996], [2.2499999999999996, 2.1650635094610986, 3.4999999999999996]],
    [[1.2990381056766578, 1.2500000000000013, -6.06217782649107], [1.5000000000000004, 0, -6.06217782649107], [0, 0, -7]],
    [[0, 0, 7], [1.5000000000000004, 0, 6.06217782649107], [1.2990381056766578, 1.2500000000000013, 6.06217782649107]]
  ]
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 72)
  t.true(comparePolygonsAsPoints(pts, exp))

  // test segments
  obs = ellipsoid({ segments: 8 })
  pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 32)

  obs = ellipsoid({ center: [-3, 5, 7], segments: 8 })
  pts = geom3.toPoints(obs)
  exp = [
    [[-2, 5, 7], [-2.2928932188134525, 4.292893218813452, 7],
      [-2.5, 4.5, 6.292893218813452], [-2.2928932188134525, 5, 6.292893218813452]],
    [[-2.2928932188134525, 5, 7.707106781186548], [-2.5, 4.5, 7.707106781186548],
      [-2.2928932188134525, 4.292893218813452, 7], [-2, 5, 7]],
    [[-2.2928932188134525, 5, 6.292893218813452], [-2.5, 4.5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-2.5, 4.5, 7.707106781186548], [-2.2928932188134525, 5, 7.707106781186548]],
    [[-2.2928932188134525, 4.292893218813452, 7], [-3, 4, 7],
      [-3, 4.292893218813452, 6.292893218813452], [-2.5, 4.5, 6.292893218813452]],
    [[-2.5, 4.5, 7.707106781186548], [-3, 4.292893218813452, 7.707106781186548],
      [-3, 4, 7], [-2.2928932188134525, 4.292893218813452, 7]],
    [[-2.5, 4.5, 6.292893218813452], [-3, 4.292893218813452, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-3, 4.292893218813452, 7.707106781186548], [-2.5, 4.5, 7.707106781186548]],
    [[-3, 4, 7], [-3.7071067811865475, 4.292893218813452, 7],
      [-3.5, 4.5, 6.292893218813452], [-3, 4.292893218813452, 6.292893218813452]],
    [[-3, 4.292893218813452, 7.707106781186548], [-3.5, 4.5, 7.707106781186548],
      [-3.7071067811865475, 4.292893218813452, 7], [-3, 4, 7]],
    [[-3, 4.292893218813452, 6.292893218813452], [-3.5, 4.5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-3.5, 4.5, 7.707106781186548], [-3, 4.292893218813452, 7.707106781186548]],
    [[-3.7071067811865475, 4.292893218813452, 7], [-4, 5, 7],
      [-3.7071067811865475, 5, 6.292893218813452], [-3.5, 4.5, 6.292893218813452]],
    [[-3.5, 4.5, 7.707106781186548], [-3.7071067811865475, 5, 7.707106781186548],
      [-4, 5, 7], [-3.7071067811865475, 4.292893218813452, 7]],
    [[-3.5, 4.5, 6.292893218813452], [-3.7071067811865475, 5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-3.7071067811865475, 5, 7.707106781186548], [-3.5, 4.5, 7.707106781186548]],
    [[-4, 5, 7], [-3.707106781186548, 5.707106781186548, 7],
      [-3.5, 5.5, 6.292893218813452], [-3.7071067811865475, 5, 6.292893218813452]],
    [[-3.7071067811865475, 5, 7.707106781186548], [-3.5, 5.5, 7.707106781186548],
      [-3.707106781186548, 5.707106781186548, 7], [-4, 5, 7]],
    [[-3.7071067811865475, 5, 6.292893218813452], [-3.5, 5.5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-3.5, 5.5, 7.707106781186548], [-3.7071067811865475, 5, 7.707106781186548]],
    [[-3.707106781186548, 5.707106781186548, 7], [-3, 6, 7],
      [-3, 5.707106781186548, 6.292893218813452], [-3.5, 5.5, 6.292893218813452]],
    [[-3.5, 5.5, 7.707106781186548], [-3, 5.707106781186548, 7.707106781186548],
      [-3, 6, 7], [-3.707106781186548, 5.707106781186548, 7]],
    [[-3.5, 5.5, 6.292893218813452], [-3, 5.707106781186548, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-3, 5.707106781186548, 7.707106781186548], [-3.5, 5.5, 7.707106781186548]],
    [[-3, 6, 7], [-2.2928932188134525, 5.707106781186548, 7],
      [-2.5, 5.5, 6.292893218813452], [-3, 5.707106781186548, 6.292893218813452]],
    [[-3, 5.707106781186548, 7.707106781186548], [-2.5, 5.5, 7.707106781186548],
      [-2.2928932188134525, 5.707106781186548, 7], [-3, 6, 7]],
    [[-3, 5.707106781186548, 6.292893218813452], [-2.5, 5.5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-2.5, 5.5, 7.707106781186548], [-3, 5.707106781186548, 7.707106781186548]],
    [[-2.2928932188134525, 5.707106781186548, 7], [-2, 5, 7],
      [-2.2928932188134525, 5, 6.292893218813452], [-2.5, 5.5, 6.292893218813452]],
    [[-2.5, 5.5, 7.707106781186548], [-2.2928932188134525, 5, 7.707106781186548],
      [-2, 5, 7], [-2.2928932188134525, 5.707106781186548, 7]],
    [[-2.5, 5.5, 6.292893218813452], [-2.2928932188134525, 5, 6.292893218813452], [-3, 5, 6]],
    [[-3, 5, 8], [-2.2928932188134525, 5, 7.707106781186548], [-2.5, 5.5, 7.707106781186548]]
  ]

  t.notThrows(() => geom3.validate(obs))
  t.is(pts.length, 32)
  t.true(comparePolygonsAsPoints(pts, exp))
})
