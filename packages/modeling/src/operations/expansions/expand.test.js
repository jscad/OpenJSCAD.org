const test = require('ava')

const { comparePoints } = require('../../../test/helpers')

const { geom2, geom3, path2 } = require('../../geometry')

const { expand } = require('./index')

test('expand: expanding of a path2 produces an expected geom2', t => {
  let points = [
    [10, 0],
    [9.510565162951535, 3.090169943749474],
    [8.090169943749475, 5.877852522924732],
    [5.877852522924732, 8.090169943749475],
    [3.0901699437494745, 9.510565162951535],
    [6.123233995736766e-16, 10]
  ]
  let geometry = path2.fromPoints({ }, points)

  // test counter clock wise winding paths
  let obs = expand({ delta: 2, corners: 'round', segments: 8 }, geometry)
  let pts = geom2.toPoints(obs)
  let exp = [
    [ 11.97537612915039, 0.3128691613674164 ],
    [ 11.485940933227539, 3.40303897857666 ],
    [ 11.292577743530273, 3.9981508255004883 ],
    [ 9.872182846069336, 6.785833358764648 ],
    [ 9.504383087158203, 7.2920660972595215 ],
    [ 7.2920660972595215, 9.504383087158203 ],
    [ 6.785833358764648, 9.872182846069336 ],
    [ 3.9981508255004883, 11.292577743530273 ],
    [ 3.40303897857666, 11.485940933227539 ],
    [ 0.3128691613674164, 11.97537612915039 ],
    [ -1.1755702495574951, 11.618034362792969 ],
    [ -1.9753766059875488, 10.31286907196045 ],
    [ -1.6180341243743896, 8.824429512023926 ],
    [ -0.3128691613674164, 8.02462387084961 ],
    [ 2.4644322395324707, 7.584741592407227 ],
    [ 4.687627792358398, 6.451967239379883 ],
    [ 6.451967239379883, 4.687627792358398 ],
    [ 7.584741592407227, 2.4644322395324707 ],
    [ 8.02462387084961, -0.3128691613674164 ],
    [ 8.824429512023926, -1.6180341243743896 ],
    [ 10.31286907196045, -1.9753766059875488 ],
    [ 11.618034362792969, -1.1755702495574951 ]
  ]
  t.is(pts.length, 22)
  t.true(comparePoints(pts, exp))

  // test clock wise winding paths
  geometry = path2.fromPoints({ }, points.reverse())
  obs = expand({ delta: 2, corners: 'round', segments: 8 }, geometry)
  pts = geom2.toPoints(obs)
  exp = [
    [ 0.3128691613674164, 11.97537612915039 ],
    [ 3.40303897857666, 11.485940933227539 ],
    [ 3.9981508255004883, 11.292577743530273 ],
    [ 6.785833358764648, 9.872182846069336 ],
    [ 7.2920660972595215, 9.504383087158203 ],
    [ 9.504383087158203, 7.2920660972595215 ],
    [ 9.872182846069336, 6.785833358764648 ],
    [ 11.292577743530273, 3.9981508255004883 ],
    [ 11.485940933227539, 3.40303897857666 ],
    [ 11.97537612915039, 0.3128691613674164 ],
    [ 11.618034362792969, -1.1755702495574951 ],
    [ 10.31286907196045, -1.9753766059875488 ],
    [ 8.824429512023926, -1.6180341243743896 ],
    [ 8.02462387084961, -0.3128691613674164 ],
    [ 7.584741592407227, 2.4644322395324707 ],
    [ 6.451967239379883, 4.687627792358398 ],
    [ 4.687627792358398, 6.451967239379883 ],
    [ 2.4644322395324707, 7.584741592407227 ],
    [ -0.3128691613674164, 8.02462387084961 ],
    [ -1.6180341243743896, 8.824429512023926 ],
    [ -1.9753766059875488, 10.31286907196045 ],
    [ -1.1755702495574951, 11.618034362792969 ]
  ]
  t.is(pts.length, 22)
  t.true(comparePoints(pts, exp))
})

test('expand: expanding of a geom2 produces expected changes to points', t => {
  let geometry = geom2.fromPoints([[-8, -8], [8, -8], [8, 8], [-8, 8]])

  let obs = expand({ delta: 2, corners: 'round', segments: 8 }, geometry)
  let pts = geom2.toPoints(obs)
  let exp = [
    [ -9.414213180541992, -9.414213180541992 ],
    [ -8, -10 ],
    [ 8, -10 ],
    [ 9.414213180541992, -9.414213180541992 ],
    [ 10, -8 ],
    [ 10, 8 ],
    [ 9.414213180541992, 9.414213180541992 ],
    [ 8, 10 ],
    [ -8, 10 ],
    [ -9.414213180541992, 9.414213180541992 ],
    [ -10, 8 ],
    [ -10, -8 ]
  ]
  t.is(pts.length, 12)
  t.true(comparePoints(pts, exp))
})

test('expand: expanding of a geom3 produces expected changes to polygons', t => {
  let polygonsAsPoints = [
    [[-5, -5, -5], [-5, -5, 15], [-5, 15, 15], [-5, 15, -5]],
    [[15, -5, -5], [15, 15, -5], [15, 15, 15], [15, -5, 15]],
    [[-5, -5, -5], [15, -5, -5], [15, -5, 15], [-5, -5, 15]],
    [[-5, 15, -5], [-5, 15, 15], [15, 15, 15], [15, 15, -5]],
    [[-5, -5, -5], [-5, 15, -5], [15, 15, -5], [15, -5, -5]],
    [[-5, -5, 15], [15, -5, 15], [15, 15, 15], [-5, 15, 15]]
  ]
  let geometry = geom3.fromPoints(polygonsAsPoints)

  let obs = expand({ delta: 2, corners: 'round', segments: 8 }, geometry)
  let pts = geom3.toPoints(obs)
  let exp0 = [
    [ -7, -5, -5 ],
    [ -7, -5, 15 ],
    [ -7, 15, 15 ],
    [ -7, 15, -5 ]
  ]
  let exp61 = [
    [ 15, -7, 15 ],
    [ 16.414213180541992, -6.41421365737915, 15 ],
    [ 16, -6.41421365737915, 16 ]
  ]

  t.is(pts.length, 62)
  t.true(comparePoints(pts[0], exp0))
  t.true(comparePoints(pts[61], exp61))
})

test('expand (options): offsetting of a complex geom2 produces expected offset geom2', t => {
  let geometry = geom2.create([
    [[-75.00000, 75.00000], [-75.00000, -75.00000]],
    [[-75.00000, -75.00000], [75.00000, -75.00000]],
    [[75.00000, -75.00000], [75.00000, 75.00000]],
    [[-40.00000, 75.00000], [-75.00000, 75.00000]],
    [[75.00000, 75.00000], [40.00000, 75.00000]],
    [[40.00000, 75.00000], [40.00000, 0.00000]],
    [[40.00000, 0.00000], [-40.00000, 0.00000]],
    [[-40.00000, 0.00000], [-40.00000, 75.00000]],
    [[15.00000, -10.00000], [15.00000, -40.00000]],
    [[-15.00000, -10.00000], [15.00000, -10.00000]],
    [[-15.00000, -40.00000], [-15.00000, -10.00000]],
    [[-8.00000, -40.00000], [-15.00000, -40.00000]],
    [[15.00000, -40.00000], [8.00000, -40.00000]],
    [[-8.00000, -25.00000], [-8.00000, -40.00000]],
    [[8.00000, -25.00000], [-8.00000, -25.00000]],
    [[8.00000, -40.00000], [8.00000, -25.00000]],
    [[-2.00000, -15.00000], [-2.00000, -19.00000]],
    [[-2.00000, -19.00000], [2.00000, -19.00000]],
    [[2.00000, -19.00000], [2.00000, -15.00000]],
    [[2.00000, -15.00000], [-2.00000, -15.00000]]
  ])

  // expand +
  let obs = expand({ delta: 2, corners: 'edge' }, geometry)
  let pts = geom2.toPoints(obs)
  let exp = [
    [ -77, -77 ],
    [ -75, -77 ],
    [ 75, -77 ],
    [ 77, -77 ],
    [ 77, -75 ],
    [ 77, 75 ],
    [ 77, 77 ],
    [ 75, 77 ],
    [ 40, 77 ],
    [ 38, 77 ],
    [ 38, 75 ],
    [ 38, 2 ],
    [ -38, 2 ],
    [ -38, 75 ],
    [ -38, 77 ],
    [ -40, 77 ],
    [ -75, 77 ],
    [ -77, 77 ],
    [ -77, 75 ],
    [ 17, -40 ],
    [ 17, -42 ],
    [ 15, -42 ],
    [ 8, -42 ],
    [ 6, -42 ],
    [ 6, -40 ],
    [ 6, -27 ],
    [ -6, -27 ],
    [ -6, -40 ],
    [ -6, -42 ],
    [ -8, -42 ],
    [ -15, -42 ],
    [ -17, -42 ],
    [ -17, -40 ],
    [ -17, -10 ],
    [ -17, -8 ],
    [ -15, -8 ],
    [ 15, -8 ],
    [ 17, -8 ],
    [ 17, -10 ],
    [ -4, -19 ],
    [ -4, -21 ],
    [ -2, -21 ],
    [ 2, -21 ],
    [ 4, -21 ],
    [ 4, -19 ],
    [ 4, -15 ],
    [ 4, -13 ],
    [ 2, -13 ],
    [ -2, -13 ],
    [ -4, -13 ],
    [ -4, -15 ],
    [ -77, -75 ]
  ]
  t.is(pts.length, 52)
  t.true(comparePoints(pts, exp))
})
