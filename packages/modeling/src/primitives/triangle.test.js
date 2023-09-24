import test from 'ava'

import { degToRad } from '../utils/index.js'

import { geom2 } from '../geometries/index.js'

import { TAU } from '../maths/constants.js'

import { measureArea } from '../measurements/index.js'

import { triangle } from './index.js'

import { comparePoints } from '../../test/helpers/index.js'

test('triangle (defaults)', (t) => {
  const geometry = triangle()
  const obs = geom2.toPoints(geometry)
  const exp = [
    [0, 0],
    [1, 0],
    [0.5000000000000002, 0.8660254037844387]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), 0.43301270189221935)
  t.is(obs.length, 3)
  t.true(comparePoints(obs, exp))
})

test('triangle (options)', (t) => {
  // test SSS
  let geometry = triangle({ type: 'SSS', values: [7, 8, 6] })
  let obs = geom2.toPoints(geometry)
  let exp = [
    [0, 0],
    [7, 0],
    [1.5, 5.809475019311125]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), 20.33316256758894)
  t.is(obs.length, 3)
  t.true(comparePoints(obs, exp))

  // test AAA
  geometry = triangle({ type: 'AAA', values: [TAU / 4, TAU / 8, TAU / 8] })
  obs = geom2.toPoints(geometry)
  exp = [
    [0, 0],
    [1, 0],
    [0, 1.0000000000000002]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.is(obs.length, 3)
  t.true(comparePoints(obs, exp))

  // test AAS
  geometry = triangle({ type: 'AAS', values: [degToRad(62), degToRad(35), 7] })
  obs = geom2.toPoints(geometry)
  exp = [
    [0, 0],
    [7.86889631692936, 0],
    [2.1348320069064197, 4.015035054457325]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), 15.796947276180953)
  t.is(obs.length, 3)
  t.true(comparePoints(obs, exp))

  // test ASA
  geometry = triangle({ type: 'ASA', values: [degToRad(76), 9, degToRad(34)] })
  obs = geom2.toPoints(geometry)
  exp = [
    [0, 0],
    [9, 0],
    [1.295667368233083, 5.196637976713814]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), 23.384870895211314)
  t.is(obs.length, 3)
  t.true(comparePoints(obs, exp))

  // test SAS
  geometry = triangle({ type: 'SAS', values: [5, degToRad(49), 7] })
  obs = geom2.toPoints(geometry)
  exp = [
    [0, 0],
    [5, 0],
    [0.4075867970664495, 5.282967061559405]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), 13.207417653898512)
  t.is(obs.length, 3)
  t.true(comparePoints(obs, exp))

  // test SSA
  geometry = triangle({ type: 'SSA', values: [8, 13, degToRad(31)] })
  obs = geom2.toPoints(geometry)
  exp = [
    [0, 0],
    [8, 0],
    [8.494946725906148, 12.990574573070846]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.is(measureArea(geometry), 51.962298292283386)
  t.is(obs.length, 3)
  t.true(comparePoints(obs, exp))
})
