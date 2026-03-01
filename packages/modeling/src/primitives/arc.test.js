import test from 'ava'

import { TAU } from '../maths/constants.js'

import { path2 } from '../geometries/index.js'

import { arc } from './index.js'

import { comparePoints } from '../../test/helpers/index.js'

test('arc (defaults)', (t) => {
  const geometry = arc()
  const obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 32)
})

test('arc (options)', (t) => {
  // test center
  let exp = [
    [3, 2],
    [2.923879532511287, 2.3826834323650896],
    [2.7071067811865475, 2.7071067811865475],
    [2.3826834323650896, 2.923879532511287],
    [2, 3],
    [1.6173165676349104, 2.923879532511287],
    [1.2928932188134525, 2.7071067811865475],
    [1.0761204674887133, 2.38268343236509],
    [1, 2],
    [1.076120467488713, 1.6173165676349104],
    [1.2928932188134523, 1.2928932188134525],
    [1.6173165676349097, 1.0761204674887135],
    [2, 1],
    [2.38268343236509, 1.0761204674887135],
    [2.7071067811865475, 1.2928932188134523],
    [2.9238795325112865, 1.6173165676349095]
  ]
  let geometry = arc({ center: [2, 2], segments: 16 })
  let obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 16)
  t.true(comparePoints(obs, exp))

  // test radius
  exp = [
    [2, 0],
    [1.8477590650225735, 0.7653668647301796],
    [1.4142135623730951, 1.414213562373095],
    [0.7653668647301797, 1.8477590650225735],
    [0, 2],
    [-0.7653668647301795, 1.8477590650225735],
    [-1.414213562373095, 1.4142135623730951],
    [-1.8477590650225735, 0.7653668647301798],
    [-2, 0],
    [-1.8477590650225737, -0.7653668647301793],
    [-1.4142135623730954, -1.414213562373095],
    [-0.7653668647301807, -1.847759065022573],
    [0, -2],
    [0.76536686473018, -1.8477590650225733],
    [1.4142135623730947, -1.4142135623730954],
    [1.847759065022573, -0.7653668647301808]
  ]
  geometry = arc({ radius: 2, segments: 16 })
  obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 16)
  t.true(comparePoints(obs, exp))

  // test startAngle
  exp = [
    [0, 1],
    [-0.3826834323650897, 0.9238795325112867],
    [-0.7071067811865475, 0.7071067811865476],
    [-0.9238795325112867, 0.3826834323650899],
    [-1, 0],
    [-0.9238795325112868, -0.38268343236508967],
    [-0.7071067811865477, -0.7071067811865475],
    [-0.38268343236509034, -0.9238795325112865],
    [0, -1],
    [0.38268343236509, -0.9238795325112866],
    [0.7071067811865474, -0.7071067811865477],
    [0.9238795325112865, -0.3826834323650904],
    [1, 0]
  ]
  geometry = arc({ startAngle: TAU / 4, segments: 16 })
  obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 13)
  t.true(comparePoints(obs, exp))

  // test endAngle
  exp = [
    [1, 0],
    [0.9238795325112867, 0.3826834323650898],
    [0.7071067811865476, 0.7071067811865475],
    [0.38268343236508984, 0.9238795325112867],
    [0, 1]
  ]
  geometry = arc({ endAngle: TAU / 4, segments: 16 })
  obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 5)
  t.true(comparePoints(obs, exp))

  // test makeTangent
  exp = [
    [1, 0],
    [0.9951847266721969, 0.0980171403295606],
    [0.8876396204028539, 0.46053871095824],
    [0.6531728429537769, 0.7572088465064846],
    [0.325310292162263, 0.9456073253805213],
    [-0.04906767432741801, 0.9987954562051724],
    [-0.416429560097637, 0.9091679830905225],
    [-0.7242470829514668, 0.689540544737067],
    [-0.9285060804732155, 0.3713171939518377],
    [-1, 0],
    [-0.9285060804732156, -0.37131719395183743],
    [-0.724247082951467, -0.6895405447370668],
    [-0.4164295600976372, -0.9091679830905224],
    [-0.04906767432741803, -0.9987954562051724],
    [0.3253102921622629, -0.9456073253805213],
    [0.6531728429537768, -0.7572088465064846],
    [0.8876396204028539, -0.46053871095823995],
    [0.9951847266721969, -0.0980171403295605]
  ]
  geometry = arc({ makeTangent: true, segments: 16 })
  obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 18)
  t.true(comparePoints(obs, exp))

  // test segments
  exp = [
    [1, 0],
    [0.7071067811865476, 0.7071067811865475],
    [0, 1],
    [-0.7071067811865475, 0.7071067811865476],
    [-1, 0],
    [-0.7071067811865477, -0.7071067811865475],
    [0, -1],
    [0.7071067811865474, -0.7071067811865477]
  ]
  geometry = arc({ segments: 8 })
  obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 8)
  t.true(comparePoints(obs, exp))
})

test('arc (rotations)', (t) => {
  let exp = [
    [0, 1],
    [-0.3826834323650897, 0.9238795325112867],
    [-0.7071067811865475, 0.7071067811865476],
    [-0.9238795325112867, 0.3826834323650899],
    [-1, 0]
  ]
  let geometry = arc({ startAngle: TAU / 4, endAngle: TAU / 2, segments: 16 })
  let obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 5)
  t.true(comparePoints(obs, exp))

  exp = [
    [-1, 0],
    [-0.9238795325112868, -0.38268343236508967],
    [-0.7071067811865477, -0.7071067811865475],
    [-0.38268343236509034, -0.9238795325112865],
    [0, -1],
    [0.38268343236509, -0.9238795325112866],
    [0.7071067811865474, -0.7071067811865477],
    [0.9238795325112865, -0.3826834323650904],
    [1, 0]
  ]
  geometry = arc({ startAngle: TAU / 2, endAngle: TAU, segments: 16 })
  obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 9)
  t.true(comparePoints(obs, exp))

  exp = [
    [0, -1],
    [0.38268343236509, -0.9238795325112866],
    [0.7071067811865474, -0.7071067811865477],
    [0.9238795325112865, -0.3826834323650904],
    [1, 0],
    [0.9238795325112867, 0.38268343236508995],
    [0.7071067811865477, 0.7071067811865474],
    [0.38268343236509045, 0.9238795325112865],
    [0, 1]
  ]
  geometry = arc({ startAngle: TAU * 0.75, endAngle: TAU / 4, segments: 16 })
  obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 9)
  t.true(comparePoints(obs, exp))

  exp = [[-1.8369701987210297e-16, -1]]
  geometry = arc({ startAngle: TAU * 0.75, endAngle: 270.000000005 * 0.017453292519943295, segments: 16 })
  obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.is(obs.length, 1)
  t.true(comparePoints(obs, exp))
})
