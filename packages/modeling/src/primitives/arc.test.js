const test = require('ava')

const { TAU } = require('../maths/constants')
const path2 = require('../geometries/path2')

const comparePoints = require('../../test/helpers/comparePoints')

const { arc } = require('./index')

test('arc (defaults)', (t) => {
  const geometry = arc()
  const obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.deepEqual(obs.length, 32)
})

test('arc (options)', (t) => {
  // test center
  let exp = [
    [3, 2],
    [2.9324722294043557, 2.361241666187153],
    [2.739008917220659, 2.6736956436465573],
    [2.4457383557765384, 2.8951632913550625],
    [2.092268359463302, 2.9957341762950342],
    [1.7263370099279172, 2.961825643172819],
    [1.3973653636207437, 2.7980172272802397],
    [1.1497828642703858, 2.526432162877356],
    [1.017026900316098, 2.1837495178165702],
    [1.017026900316098, 1.8162504821834298],
    [1.149782864270386, 1.4735678371226442],
    [1.3973653636207435, 1.2019827727197605],
    [1.726337009927917, 1.0381743568271808],
    [2.0922683594633016, 1.0042658237049653],
    [2.4457383557765384, 1.1048367086449378],
    [2.739008917220659, 1.326304356353443],
    [2.9324722294043557, 1.6387583338128469]
  ]
  let geometry = arc({ center: [2, 2], segments: 16 })
  let obs = path2.toPoints(geometry)

  t.notThrows(() => path2.validate(geometry))
  t.deepEqual(obs.length, 16)
//console.log(obs)
  //t.true(comparePoints(obs, exp))

  // test radius
  exp = [
  [ 2, 0 ],
  [ 1.8477590650225735, 0.7653668647301796 ],
  [ 1.4142135623730951, 1.414213562373095 ],
  [ 0.7653668647301797, 1.8477590650225735 ],
  [ 0, 2 ],
  [ -0.7653668647301795, 1.8477590650225735 ],
  [ -1.414213562373095, 1.4142135623730951 ],
  [ -1.8477590650225735, 0.7653668647301798 ],
  [ -2, 0 ],
  [ -1.8477590650225737, -0.7653668647301793 ],
  [ -1.4142135623730954, -1.414213562373095 ],
  [ -0.7653668647301807, -1.847759065022573 ],
  [ 0, -2 ],
  [ 0.76536686473018, -1.8477590650225733 ],
  [ 1.4142135623730947, -1.4142135623730954 ],
  [ 1.847759065022573, -0.7653668647301808 ]
  ]
  geometry = arc({ radius: 2, segments: 16 })

  t.notThrows(() => path2.validate(geometry))
  t.is(geometry.isClosed, true)

  obs = path2.toPoints(geometry)
  t.is(obs.length, 16)
  t.true(comparePoints(obs, exp))

  // test startAngle
  exp = [
    [ 0, 1 ],
    [ -0.3826834323650897, 0.9238795325112867 ],
    [ -0.7071067811865475, 0.7071067811865476 ],
    [ -0.9238795325112867, 0.3826834323650899 ],
    [ -1, 0 ],
    [ -0.9238795325112868, -0.38268343236508967 ],
    [ -0.7071067811865477, -0.7071067811865475 ],
    [ -0.38268343236509034, -0.9238795325112865 ],
    [ 0, -1 ],
    [ 0.38268343236509, -0.9238795325112866 ],
    [ 0.7071067811865474, -0.7071067811865477 ],
    [ 0.9238795325112865, -0.3826834323650904 ],
    [ 1, 0 ]
  ]
  geometry = arc({ startAngle: TAU / 4, segments: 16 })

  t.notThrows(() => path2.validate(geometry))
  t.is(geometry.isClosed, false)

  obs = path2.toPoints(geometry)
  t.is(obs.length, 13)
  t.true(comparePoints(obs, exp))

  // test endAngle
  exp = [
    [ 1, 0 ],
    [ 0.9238795325112867, 0.3826834323650898 ],
    [ 0.7071067811865476, 0.7071067811865475 ],
    [ 0.38268343236508984, 0.9238795325112867 ],
    [ 0, 1 ]
  ]
  geometry = arc({ endAngle: TAU / 4, segments: 16 })

  t.notThrows(() => path2.validate(geometry))
  t.is(geometry.isClosed, false)

  obs = path2.toPoints(geometry)
  t.is(obs.length, 5)
  t.true(comparePoints(obs, exp))

  // test makeTangent
  exp = [
  [ 1, 0 ],
  [ 0.9951847266721969, 0.0980171403295606 ],
  [ 0.8876396204028539, 0.46053871095824 ],
  [ 0.6531728429537769, 0.7572088465064846 ],
  [ 0.325310292162263, 0.9456073253805213 ],
  [ -0.04906767432741801, 0.9987954562051724 ],
  [ -0.416429560097637, 0.9091679830905225 ],
  [ -0.7242470829514668, 0.689540544737067 ],
  [ -0.9285060804732155, 0.3713171939518377 ],
  [ -1, 0 ],
  [ -0.9285060804732156, -0.37131719395183743 ],
  [ -0.724247082951467, -0.6895405447370668 ],
  [ -0.4164295600976372, -0.9091679830905224 ],
  [ -0.04906767432741803, -0.9987954562051724 ],
  [ 0.3253102921622629, -0.9456073253805213 ],
  [ 0.6531728429537768, -0.7572088465064846 ],
  [ 0.8876396204028539, -0.46053871095823995 ],
  [ 0.9951847266721969, -0.0980171403295605 ]
  ]
  geometry = arc({ makeTangent: true, segments: 16 })

  t.notThrows(() => path2.validate(geometry))
  t.is(geometry.isClosed, true)

  obs = path2.toPoints(geometry)
  t.is(obs.length, 18)
  t.true(comparePoints(obs, exp))

  // test segments
  exp = [
    [1, 0],
    [0.7071067811865476, 0.7071067811865475],
    [0, 1 ],
    [-0.7071067811865475, 0.7071067811865476],
    [-1, 0 ],
    [-0.7071067811865477, -0.7071067811865475],
    [0, -1 ],
    [0.7071067811865474, -0.7071067811865477]
  ]
  geometry = arc({ segments: 8 })

  t.notThrows(() => path2.validate(geometry))
  t.is(geometry.isClosed, true)

  obs = path2.toPoints(geometry)
  t.is(obs.length, 8)
  t.true(comparePoints(obs, exp))
})

test('arc (rotations)', (t) => {
  let exp = [
  [ 0, 1 ],
  [ -0.3826834323650897, 0.9238795325112867 ],
  [ -0.7071067811865475, 0.7071067811865476 ],
  [ -0.9238795325112867, 0.3826834323650899 ],
  [ -1, 0 ]
  ]
  let geometry = arc({ startAngle: TAU / 4, endAngle: TAU / 2, segments: 16 })

  t.notThrows(() => path2.validate(geometry))
  t.is(geometry.isClosed, false)

  let obs = path2.toPoints(geometry)
  t.is(obs.length, 5)
  t.true(comparePoints(obs, exp))

  exp = [
  [ -1, 0 ],
  [ -0.9238795325112868, -0.38268343236508967 ],
  [ -0.7071067811865477, -0.7071067811865475 ],
  [ -0.38268343236509034, -0.9238795325112865 ],
  [ 0, -1 ],
  [ 0.38268343236509, -0.9238795325112866 ],
  [ 0.7071067811865474, -0.7071067811865477 ],
  [ 0.9238795325112865, -0.3826834323650904 ],
  [ 1, 0 ]
  ]
  geometry = arc({ startAngle: TAU / 2, endAngle: TAU, segments: 16 })

  t.notThrows(() => path2.validate(geometry))
  t.is(geometry.isClosed, false)

  obs = path2.toPoints(geometry)
  t.is(obs.length, 9)
  t.true(comparePoints(obs, exp))

  exp = [
  [ 0, -1 ],
  [ 0.38268343236509, -0.9238795325112866 ],
  [ 0.7071067811865474, -0.7071067811865477 ],
  [ 0.9238795325112865, -0.3826834323650904 ],
  [ 1, 0 ],
  [ 0.9238795325112867, 0.38268343236508995 ],
  [ 0.7071067811865477, 0.7071067811865474 ],
  [ 0.38268343236509045, 0.9238795325112865 ],
  [ 0, 1 ]
  ]
  geometry = arc({ startAngle: TAU * 0.75, endAngle: TAU / 4, segments: 16 })

  t.notThrows(() => path2.validate(geometry))
  t.is(geometry.isClosed, false)

  obs = path2.toPoints(geometry)
  t.is(obs.length, 9)
  t.true(comparePoints(obs, exp))

  exp = [[0, -1]]
  geometry = arc({ startAngle: TAU * 0.75, endAngle: 270.000000005 * 0.017453292519943295, segments: 16 })

  t.notThrows(() => path2.validate(geometry))
  t.is(geometry.isClosed, false)

  obs = path2.toPoints(geometry)
  t.deepEqual(obs.length, 1)
  t.true(comparePoints(obs, exp))
})
