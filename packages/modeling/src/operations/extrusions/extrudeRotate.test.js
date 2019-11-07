const test = require('ava')

const { degToRad } = require('../../math/utils')

const { geom2, geom3 } = require('../../geometry')

const extrudeRotate = require('./extrudeRotate')

const comparePolygonsAsPoints = require('../../../test/helpers/comparePolygonsAsPoints')

test('extrudeRotate: (defaults) extruding of a geom2 produces an expected geom3', t => {
  let geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  let geometry3 = extrudeRotate({ }, geometry2)
  let pts = geom3.toPoints(geometry3)
  t.is(pts.length, 96)
})

test('extrudeRotate: (angle) extruding of a geom2 produces an expected geom3', t => {
  let geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  // test angle
  let geometry3 = extrudeRotate({ segments: 4, angle: degToRad(45) }, geometry2)
  let pts = geom3.toPoints(geometry3)
  let exp = [
    [ [ 10, 4.898587410340671e-16, 8 ], [ 26, 4.898587410340671e-16, 8 ], [ 18.384775161743164, 18.384775161743164, 8 ] ],
    [ [ 10, 4.898587410340671e-16, 8 ], [ 18.384775161743164, 18.384775161743164, 8 ], [ 7.071067810058594, 7.071067810058594, 8 ] ],
    [ [ 10, -4.898587410340671e-16, -8 ], [ 10, 4.898587410340671e-16, 8 ], [ 7.071067810058594, 7.071067810058594, 8 ] ],
    [ [ 10, -4.898587410340671e-16, -8 ], [ 7.071067810058594, 7.071067810058594, 8 ], [ 7.071067810058594, 7.071067810058594, -8 ] ],
    [ [ 26, -4.898587410340671e-16, -8 ], [ 10, -4.898587410340671e-16, -8 ], [ 7.071067810058594, 7.071067810058594, -8 ] ],
    [ [ 26, -4.898587410340671e-16, -8 ], [ 7.071067810058594, 7.071067810058594, -8 ], [ 18.384775161743164, 18.384775161743164, -8 ] ],
    [ [ 26, 4.898587410340671e-16, 8 ], [ 26, -4.898587410340671e-16, -8 ], [ 18.384775161743164, 18.384775161743164, -8 ] ],
    [ [ 26, 4.898587410340671e-16, 8 ], [ 18.384775161743164, 18.384775161743164, -8 ], [ 18.384775161743164, 18.384775161743164, 8 ] ],
    [ [ 18.384775161743164, 18.384775161743164, 8 ], [ 18.384775161743164, 18.384775161743164, -8 ],
      [ 7.071067810058594, 7.071067810058594, -8 ], [ 7.071067810058594, 7.071067810058594, 8 ] ],
    [ [ 10, 4.898587410340671e-16, 8 ], [ 10, -4.898587410340671e-16, -8 ],
      [ 26, -4.898587410340671e-16, -8 ], [ 26, 4.898587410340671e-16, 8 ] ]
  ]
  t.is(pts.length, 10)
  t.true(comparePolygonsAsPoints(pts, exp))

  geometry3 = extrudeRotate({ segments: 4, angle: degToRad(-250) }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.is(pts.length, 26)

  geometry3 = extrudeRotate({ segments: 4, angle: degToRad(250) }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.is(pts.length, 26)
})

test('extrudeRotate: (startAngle) extruding of a geom2 produces an expected geom3', t => {
  let geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  // test startAngle
  let geometry3 = extrudeRotate({ segments: 5, startAngle: degToRad(45) }, geometry2)
  let pts = geom3.toPoints(geometry3)
  let exp = [
    new Float32Array([ 7.071067810058594, 7.071067810058594, 8 ]),
    new Float32Array([ 18.384775161743164, 18.384775161743164, 8 ]),
    new Float32Array([ -11.803752899169922, 23.166170120239258, 8 ])
  ]
  t.is(pts.length, 40)
  t.deepEqual(pts[0], exp)

  geometry3 = extrudeRotate({ segments: 5, startAngle: degToRad(-45) }, geometry2)
  pts = geom3.toPoints(geometry3)
  exp = [
    new Float32Array([ 7.071067810058594, -7.071067810058594, 8 ]),
    new Float32Array([ 18.384775161743164, -18.384775161743164, 8 ]),
    new Float32Array([ 23.166170120239258, 11.803752899169922, 8 ])
  ]
  t.is(pts.length, 40)
  t.deepEqual(pts[0], exp)
})

test('extrudeRotate: (segments) extruding of a geom2 produces an expected geom3', t => {
  let geometry2 = geom2.fromPoints([[10, 8], [10, -8], [26, -8], [26, 8]])

  // test segments
  let geometry3 = extrudeRotate({ segments: 4 }, geometry2)
  let pts = geom3.toPoints(geometry3)
  t.is(pts.length, 32)

  geometry3 = extrudeRotate({ segments: 64 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.is(pts.length, 512)

  // test overlapping edges
  geometry2 = geom2.fromPoints([[0, 0], [2, 1], [1, 2], [1, 3], [3, 4], [0, 5]])
  geometry3 = extrudeRotate({ segments: 8 }, geometry2)
  pts = geom3.toPoints(geometry3)
  t.is(pts.length, 96)
})

test('extrudeRotate: (overlap +/-) extruding of a geom2 produces an expected geom3', t => {
  // overlap of Y axis; even number of + and - points
  let geometry = geom2.fromPoints([[-1, 8], [-1, -8], [7, -8], [7, 8]])

  let obs = extrudeRotate({ segments: 4, angle: degToRad(90) }, geometry)
  let pts = geom3.toPoints(obs)
  let exp = [
    [ [ 0, 4.898587410340671e-16, 8 ], [ 7, 4.898587410340671e-16, 8 ], [ -6.123234262925839e-17, 7, 8 ] ],
    [ [ 0, 4.898587410340671e-16, 8 ], [ -6.123234262925839e-17, 7, 8 ], [ -4.898587410340671e-16, 2.999519808315976e-32, 8 ] ],
    [ [ 0, -4.898587410340671e-16, -8 ], [ 0, 4.898587410340671e-16, 8 ], [ -4.898587410340671e-16, 2.999519808315976e-32, 8 ] ],
    [ [ 0, -4.898587410340671e-16, -8 ], [ -4.898587410340671e-16, 2.999519808315976e-32, 8 ], [ 4.898587410340671e-16, -2.999519808315976e-32, -8 ] ],
    [ [ 7, -4.898587410340671e-16, -8 ], [ 0, -4.898587410340671e-16, -8 ], [ 4.898587410340671e-16, -2.999519808315976e-32, -8 ] ],
    [ [ 7, -4.898587410340671e-16, -8 ], [ 4.898587410340671e-16, -2.999519808315976e-32, -8 ], [ 9.184851526737657e-16, 7, -8 ] ],
    [ [ 7, 4.898587410340671e-16, 8 ], [ 7, -4.898587410340671e-16, -8 ], [ 9.184851526737657e-16, 7, -8 ] ],
    [ [ 7, 4.898587410340671e-16, 8 ], [ 9.184851526737657e-16, 7, -8 ], [ -6.123234262925839e-17, 7, 8 ] ],
    [ [ -4.898587410340671e-16, 0, 8 ], [ -6.1232435273487e-17, 7, 8 ],
      [ 9.184851526737657e-16, 7, -8 ], [ 4.898587939736263e-16, 0, -8 ] ],
    [ [ 7, 4.898587410340671e-16, 8 ], [ 0, 4.898587410340671e-16, 8 ],
      [ 0, -4.898587410340671e-16, -8 ], [ 7, -4.898587410340671e-16, -8 ] ]
  ]
  t.is(pts.length, 10)
  t.true(comparePolygonsAsPoints(pts, exp))

  // overlap of Y axis; larger number of - points
  geometry = geom2.fromPoints([[-1, 8], [-2, 4], [-1, -8], [7, -8], [7, 8]])

  obs = extrudeRotate({ segments: 4, angle: degToRad(90) }, geometry)
  pts = geom3.toPoints(obs)
  exp = [
    [ [ -1, 4.898587410340671e-16, 8 ], [ 0, 4.898587410340671e-16, 8 ], [ -4.898587410340671e-16, 2.999519808315976e-32, 8 ] ],
    [ [ -1, 4.898587410340671e-16, 8 ], [ -4.898587410340671e-16, 2.999519808315976e-32, 8 ], [ -5.510910704284357e-16, -1, 8 ] ],
    [ [ -2, 2.4492937051703357e-16, 4 ], [ -1, 4.898587410340671e-16, 8 ], [ -5.510910704284357e-16, -1, 8 ] ],
    [ [ -2, 2.4492937051703357e-16, 4 ], [ -5.510910704284357e-16, -1, 8 ], [ -3.6739405577555036e-16, -2, 4 ] ],
    [ [ -1, -4.898587410340671e-16, -8 ], [ -2, 2.4492937051703357e-16, 4 ], [ -3.6739405577555036e-16, -2, 4 ] ],
    [ [ -1, -4.898587410340671e-16, -8 ], [ -3.6739405577555036e-16, -2, 4 ], [ 4.2862641163969855e-16, -1, -8 ] ],
    [ [ 0, -4.898587410340671e-16, -8 ], [ -1, -4.898587410340671e-16, -8 ], [ 4.2862641163969855e-16, -1, -8 ] ],
    [ [ 0, -4.898587410340671e-16, -8 ], [ 4.2862641163969855e-16, -1, -8 ], [ 4.898587410340671e-16, -2.999519808315976e-32, -8 ] ],
    [ [ 0, 4.898587410340671e-16, 8 ], [ 0, -4.898587410340671e-16, -8 ], [ 4.898587410340671e-16, -2.999519808315976e-32, -8 ] ],
    [ [ 0, 4.898587410340671e-16, 8 ], [ 4.898587410340671e-16, -2.999519808315976e-32, -8 ], [ -4.898587410340671e-16, 2.999519808315976e-32, 8 ] ],
    [ [ -4.898586351549487e-16, 0, 8 ],
      [ 4.89858952792304e-16, 0, -8 ],
      [ 4.2862662339793536e-16, -1.0000007152557373, -8 ],
      [ -3.6739387048709314e-16, -2.000000476837158, 3.9999990463256836 ],
      [ -5.510910174888765e-16, -1.0000001192092896, 8 ] ],
    [ [ 0, 4.898587410340671e-16, 8 ],
      [ -1.000000238418579, 4.898587410340671e-16, 8 ],
      [ -1.9999998807907104, 2.4492942345659277e-16, 4.000000953674316 ],
      [ -0.9999998807907104, -4.898587410340671e-16, -8 ],
      [ 0, -4.898587410340671e-16, -8 ] ]
  ]
  t.is(pts.length, 12)
  t.true(comparePolygonsAsPoints(pts, exp))
})

// TEST HOLES
