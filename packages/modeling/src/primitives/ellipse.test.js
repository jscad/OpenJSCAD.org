const test = require('ava')

const { TAU } = require('../maths/constants')
const geom2 = require('../geometries/geom2')

const comparePoints = require('../../test/helpers/comparePoints')

const { ellipse } = require('./index')

test('ellipse (defaults)', (t) => {
  const geometry = ellipse()
  const obs = geom2.toPoints(geometry)

  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 32)
})

test('ellipse (options)', (t) => {
  // test center
  let geometry = ellipse({ center: [3, 5] })
  let obs = geom2.toPoints(geometry)
  let exp = [
    [4, 5],
    [3.9807852804032304, 5.195090322016128],
    [3.923879532511287, 5.38268343236509],
    [3.8314696123025453, 5.555570233019602],
    [3.7071067811865475, 5.707106781186548],
    [3.555570233019602, 5.831469612302545],
    [3.3826834323650896, 5.923879532511287],
    [3.1950903220161284, 5.98078528040323],
    [3, 6],
    [2.804909677983872, 5.98078528040323],
    [2.6173165676349104, 5.923879532511287],
    [2.444429766980398, 5.831469612302545],
    [2.2928932188134525, 5.707106781186548],
    [2.1685303876974547, 5.555570233019602],
    [2.076120467488713, 5.38268343236509],
    [2.0192147195967696, 5.195090322016129],
    [2, 5],
    [2.0192147195967696, 4.804909677983872],
    [2.076120467488713, 4.61731656763491],
    [2.1685303876974547, 4.444429766980398],
    [2.292893218813452, 4.292893218813452],
    [2.444429766980398, 4.168530387697455],
    [2.6173165676349095, 4.076120467488714],
    [2.804909677983871, 4.01921471959677],
    [3, 4],
    [3.1950903220161284, 4.01921471959677],
    [3.38268343236509, 4.076120467488713],
    [3.5555702330196017, 4.168530387697454],
    [3.7071067811865475, 4.292893218813452],
    [3.8314696123025453, 4.444429766980398],
    [3.9238795325112865, 4.6173165676349095],
    [3.9807852804032304, 4.804909677983871]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 32)
  t.true(comparePoints(obs, exp))

  // test radius
  geometry = ellipse({ radius: [3, 5], segments: 16 })
  obs = geom2.toPoints(geometry)
  exp = [
    [3, 0],
    [2.77163859753386, 1.913417161825449],
    [2.121320343559643, 3.5355339059327373],
    [1.1480502970952695, 4.619397662556434],
    [0, 5],
    [-1.1480502970952693, 4.619397662556434],
    [-2.1213203435596424, 3.5355339059327378],
    [-2.77163859753386, 1.9134171618254494],
    [-3, 0],
    [-2.7716385975338604, -1.9134171618254483],
    [-2.121320343559643, -3.5355339059327373],
    [-1.148050297095271, -4.619397662556432],
    [0, -5],
    [1.14805029709527, -4.619397662556433],
    [2.121320343559642, -3.5355339059327386],
    [2.7716385975338595, -1.913417161825452]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 16)
  t.true(comparePoints(obs, exp))

  // test startAngle
  geometry = ellipse({ radius: [3, 5], startAngle: TAU / 4, segments: 16 })
  obs = geom2.toPoints(geometry)
  exp = [
    [0, 5],
    [-1.1480502970952693, 4.619397662556434],
    [-2.1213203435596424, 3.5355339059327378],
    [-2.77163859753386, 1.9134171618254494],
    [-3, 0],
    [-2.7716385975338604, -1.9134171618254483],
    [-2.121320343559643, -3.5355339059327373],
    [-1.148050297095271, -4.619397662556432],
    [0, -5],
    [1.14805029709527, -4.619397662556433],
    [2.121320343559642, -3.5355339059327386],
    [2.7716385975338595, -1.913417161825452],
    [3, 0],
    [0, 0]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 14)
  t.true(comparePoints(obs, exp))

  // test endAngle
  geometry = ellipse({ radius: [3, 5], endAngle: TAU / 4, segments: 16 })
  obs = geom2.toPoints(geometry)
  exp = [
    [3, 0],
    [2.77163859753386, 1.913417161825449],
    [2.121320343559643, 3.5355339059327373],
    [1.1480502970952695, 4.619397662556434],
    [0, 5],
    [0, 0]
  ]

  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 6)
  t.true(comparePoints(obs, exp))

  // test full rotation with non-zero startAngle
  geometry = ellipse({ startAngle: 1, endAngle: 1 + TAU })
  obs = geom2.toPoints(geometry)

  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 32)

  // test segments
  geometry = ellipse({ segments: 72 })
  obs = geom2.toPoints(geometry)
  t.notThrows(() => geom2.validate(geometry))
  t.deepEqual(obs.length, 72)
})

test('ellipse (zero radius)', (t) => {
  const geometry = ellipse({ radius: [1, 0] })
  const obs = geom2.toPoints(geometry)
  t.notThrows(() => geom2.validate(geometry))
  t.is(obs.length, 0)
})
