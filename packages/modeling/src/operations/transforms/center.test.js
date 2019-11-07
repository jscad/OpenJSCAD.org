const test = require('ava')

const { geom2, geom3, path2 } = require('../../geometry')

const { center, centerX, centerY, centerZ } = require('./index')

test('center: centering of a path2 produces expected changes to points', t => {
  let geometry = path2.fromPoints({}, [[5, 0], [0, 3], [-1, 0]])

  // center about X
  let centered = center({ axes: [true, false, false] }, geometry)
  let pts = path2.toPoints(centered)
  let exp = [
    new Float32Array([ 3, 0 ]),
    new Float32Array([ -2, 3 ]),
    new Float32Array([ -3, 0 ])
  ]
  t.deepEqual(pts, exp)

  centered = centerX(geometry)
  pts = path2.toPoints(centered)
  t.deepEqual(pts, exp)
})

test('center: centering of a geom2 produces expected changes to points', t => {
  let geometry = geom2.fromPoints([[0, 0], [10, 0], [0, 10]])

  // center about Y
  let centered = center({ axes: [false, true, false] }, geometry)
  let pts = geom2.toPoints(centered)
  let exp = [
    new Float32Array([ 0, -5 ]),
    new Float32Array([ 10, -5 ]),
    new Float32Array([ 0, 5 ])
  ]
  t.deepEqual(pts, exp)

  centered = centerY(geometry)
  pts = geom2.toPoints(centered)
  t.deepEqual(pts, exp)
})

test('center: centering of a geom3 produces expected changes to polygons', t => {
  let points = [
    [ [-2, -7, -12], [-2, -7, 18], [-2, 13, 18], [-2, 13, -12] ],
    [ [8, -7, -12], [8, 13, -12], [8, 13, 18], [8, -7, 18] ],
    [ [-2, -7, -12], [8, -7, -12], [8, -7, 18], [-2, -7, 18] ],
    [ [-2, 13, -12], [-2, 13, 18], [8, 13, 18], [8, 13, -12] ],
    [ [-2, -7, -12], [-2, 13, -12], [8, 13, -12], [8, -7, -12] ],
    [ [-2, -7, 18], [8, -7, 18], [8, 13, 18], [-2, 13, 18] ]
  ]
  let geometry = geom3.fromPoints(points)

  // center about X
  let centered = center({ axes: [true, false, false] }, geometry)
  let pts = geom3.toPoints(centered)
  let exp = [
    [ new Float32Array([ -5, -7, -12 ]),
      new Float32Array([ -5, -7, 18 ]),
      new Float32Array([ -5, 13, 18 ]),
      new Float32Array([ -5, 13, -12 ]) ],
    [ new Float32Array([ 5, -7, -12 ]),
      new Float32Array([ 5, 13, -12 ]),
      new Float32Array([ 5, 13, 18 ]),
      new Float32Array([ 5, -7, 18 ]) ],
    [ new Float32Array([ -5, -7, -12 ]),
      new Float32Array([ 5, -7, -12 ]),
      new Float32Array([ 5, -7, 18 ]),
      new Float32Array([ -5, -7, 18 ]) ],
    [ new Float32Array([ -5, 13, -12 ]),
      new Float32Array([ -5, 13, 18 ]),
      new Float32Array([ 5, 13, 18 ]),
      new Float32Array([ 5, 13, -12 ]) ],
    [ new Float32Array([ -5, -7, -12 ]),
      new Float32Array([ -5, 13, -12 ]),
      new Float32Array([ 5, 13, -12 ]),
      new Float32Array([ 5, -7, -12 ]) ],
    [ new Float32Array([ -5, -7, 18 ]),
      new Float32Array([ 5, -7, 18 ]),
      new Float32Array([ 5, 13, 18 ]),
      new Float32Array([ -5, 13, 18 ]) ]
  ]
  t.deepEqual(pts, exp)

  centered = centerX(geometry)
  pts = geom3.toPoints(centered)
  t.deepEqual(pts, exp)

  // center about Y
  centered = center({ axes: [false, true, false] }, geometry)
  pts = geom3.toPoints(centered)
  exp = [
    [ new Float32Array([ -2, -10, -12 ]),
      new Float32Array([ -2, -10, 18 ]),
      new Float32Array([ -2, 10, 18 ]),
      new Float32Array([ -2, 10, -12 ]) ],
    [ new Float32Array([ 8, -10, -12 ]),
      new Float32Array([ 8, 10, -12 ]),
      new Float32Array([ 8, 10, 18 ]),
      new Float32Array([ 8, -10, 18 ]) ],
    [ new Float32Array([ -2, -10, -12 ]),
      new Float32Array([ 8, -10, -12 ]),
      new Float32Array([ 8, -10, 18 ]),
      new Float32Array([ -2, -10, 18 ]) ],
    [ new Float32Array([ -2, 10, -12 ]),
      new Float32Array([ -2, 10, 18 ]),
      new Float32Array([ 8, 10, 18 ]),
      new Float32Array([ 8, 10, -12 ]) ],
    [ new Float32Array([ -2, -10, -12 ]),
      new Float32Array([ -2, 10, -12 ]),
      new Float32Array([ 8, 10, -12 ]),
      new Float32Array([ 8, -10, -12 ]) ],
    [ new Float32Array([ -2, -10, 18 ]),
      new Float32Array([ 8, -10, 18 ]),
      new Float32Array([ 8, 10, 18 ]),
      new Float32Array([ -2, 10, 18 ]) ]
  ]
  t.deepEqual(pts, exp)

  centered = centerY(geometry)
  pts = geom3.toPoints(centered)
  t.deepEqual(pts, exp)

  // center about Z
  centered = center({ axes: [false, false, true] }, geometry)
  pts = geom3.toPoints(centered)
  exp = [
    [ new Float32Array([ -2, -7, -15 ]),
      new Float32Array([ -2, -7, 15 ]),
      new Float32Array([ -2, 13, 15 ]),
      new Float32Array([ -2, 13, -15 ]) ],
    [ new Float32Array([ 8, -7, -15 ]),
      new Float32Array([ 8, 13, -15 ]),
      new Float32Array([ 8, 13, 15 ]),
      new Float32Array([ 8, -7, 15 ]) ],
    [ new Float32Array([ -2, -7, -15 ]),
      new Float32Array([ 8, -7, -15 ]),
      new Float32Array([ 8, -7, 15 ]),
      new Float32Array([ -2, -7, 15 ]) ],
    [ new Float32Array([ -2, 13, -15 ]),
      new Float32Array([ -2, 13, 15 ]),
      new Float32Array([ 8, 13, 15 ]),
      new Float32Array([ 8, 13, -15 ]) ],
    [ new Float32Array([ -2, -7, -15 ]),
      new Float32Array([ -2, 13, -15 ]),
      new Float32Array([ 8, 13, -15 ]),
      new Float32Array([ 8, -7, -15 ]) ],
    [ new Float32Array([ -2, -7, 15 ]),
      new Float32Array([ 8, -7, 15 ]),
      new Float32Array([ 8, 13, 15 ]),
      new Float32Array([ -2, 13, 15 ]) ]
  ]
  t.deepEqual(pts, exp)

  centered = centerZ(geometry)
  pts = geom3.toPoints(centered)
  t.deepEqual(pts, exp)
})

test('center: centering of multiple objects produces expected changes', t => {
  let junk = 'hello'
  let geometry1 = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])
  let geometry2 = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  let centered = center({ axes: [true, true, false], center: [10, 15, 0] }, junk, geometry1, geometry2)

  t.is(centered[0], junk)

  let pts1 = path2.toPoints(centered[1])
  let exp1 = [
    new Float32Array([ 2.5, 20 ]),
    new Float32Array([ 12.5, 20 ]),
    new Float32Array([ 2.5, 10 ]),
    new Float32Array([ 17.5, 10 ])
  ]
  t.deepEqual(pts1, exp1)

  let pts2 = geom2.toPoints(centered[2])
  let exp2 = [
    new Float32Array([ 2.5, 10 ]),
    new Float32Array([ 7.5, 20 ]),
    new Float32Array([ 17.5, 10 ])
  ]
  t.deepEqual(pts2, exp2)
})
