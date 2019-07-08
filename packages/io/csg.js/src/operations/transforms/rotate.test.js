const test = require('ava')

const { geom2, geom3, path2 } = require('../../geometry')

const { rotate, rotateX, rotateY, rotateZ } = require('./index')

const comparePoints = require('../../../test/helpers/comparePoints')

test('rotate: rotating of a path2 produces expected changes to points', t => {
  let geometry = path2.fromPoints({}, [[1, 0], [0, 1], [-1, 0]])

  // rotate about Z
  let rotated = rotate([0, 0, 90], geometry)
  let obs = path2.toPoints(rotated)
  let exp = [
    new Float32Array([ 0, 1 ]),
    new Float32Array([ -1, 0 ]),
    new Float32Array([ -0, -1 ])
  ]
  t.true(comparePoints(obs, exp))

  rotated = rotateZ(90, geometry)
  obs = path2.toPoints(rotated)
  t.true(comparePoints(obs, exp))
})

test('rotate: rotating of a geom2 produces expected changes to points', t => {
  let geometry = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])

  // rotate about Z
  let rotated = rotate([0, 0, -90], geometry)
  let obs = geom2.toPoints(rotated)
  let exp = [
    new Float32Array([0, 0]),
    new Float32Array([0, -1]),
    new Float32Array([1, 0])
  ]
  t.true(comparePoints(obs, exp))

  rotated = rotateZ(-90, geometry)
  obs = geom2.toPoints(rotated)
  t.true(comparePoints(obs, exp))
})

test('rotate: rotating of a geom3 produces expected changes to polygons', t => {
  let points = [
    [ [-2, -7, -12], [-2, -7, 18], [-2, 13, 18], [-2, 13, -12] ],
    [ [8, -7, -12], [8, 13, -12], [8, 13, 18], [8, -7, 18] ],
    [ [-2, -7, -12], [8, -7, -12], [8, -7, 18], [-2, -7, 18] ],
    [ [-2, 13, -12], [-2, 13, 18], [8, 13, 18], [8, 13, -12] ],
    [ [-2, -7, -12], [-2, 13, -12], [8, 13, -12], [8, -7, -12] ],
    [ [-2, -7, 18], [8, -7, 18], [8, 13, 18], [-2, 13, 18] ]
  ]
  let geometry = geom3.fromPoints(points)

  // rotate about X
  let rotated = rotate([90, 0, 0], geometry)
  let obs = geom3.toPoints(rotated)
  let exp = [
    [ new Float32Array([ -2, 12, -7 ]), new Float32Array([ -2, -18, -7 ]),
      new Float32Array([ -2, -18, 13 ]), new Float32Array([ -2, 12, 13 ]) ],
    [ new Float32Array([ 8, 12, -7 ]), new Float32Array([ 8, 12, 13 ]),
      new Float32Array([ 8, -18, 13 ]), new Float32Array([ 8, -18, -7 ]) ],
    [ new Float32Array([ -2, 12, -7 ]), new Float32Array([ 8, 12, -7 ]),
      new Float32Array([ 8, -18, -7 ]), new Float32Array([ -2, -18, -7 ]) ],
    [ new Float32Array([ -2, 12, 13 ]), new Float32Array([ -2, -18, 13 ]),
      new Float32Array([ 8, -18, 13 ]), new Float32Array([ 8, 12, 13 ]) ],
    [ new Float32Array([ -2, 12, -7 ]), new Float32Array([ -2, 12, 13 ]),
      new Float32Array([ 8, 12, 13 ]), new Float32Array([ 8, 12, -7 ]) ],
    [ new Float32Array([ -2, -18, -7 ]), new Float32Array([ 8, -18, -7 ]),
      new Float32Array([ 8, -18, 13 ]), new Float32Array([ -2, -18, 13 ]) ]
  ]
  t.deepEqual(obs, exp)

  rotated = rotateX(90, geometry)
  obs = geom3.toPoints(rotated)
  t.deepEqual(obs, exp)

  // rotate about Y
  rotated = rotate([0, -90, 0], geometry)
  obs = geom3.toPoints(rotated)
  exp = [
    [ new Float32Array([ 12, -7, -2 ]), new Float32Array([ -18, -7, -2 ]),
      new Float32Array([ -18, 13, -2 ]), new Float32Array([ 12, 13, -2 ]) ],
    [ new Float32Array([ 12, -7, 8 ]), new Float32Array([ 12, 13, 8 ]),
      new Float32Array([ -18, 13, 8 ]), new Float32Array([ -18, -7, 8 ]) ],
    [ new Float32Array([ 12, -7, -2 ]), new Float32Array([ 12, -7, 8 ]),
      new Float32Array([ -18, -7, 8 ]), new Float32Array([ -18, -7, -2 ]) ],
    [ new Float32Array([ 12, 13, -2 ]), new Float32Array([ -18, 13, -2 ]),
      new Float32Array([ -18, 13, 8 ]), new Float32Array([ 12, 13, 8 ]) ],
    [ new Float32Array([ 12, -7, -2 ]), new Float32Array([ 12, 13, -2 ]),
      new Float32Array([ 12, 13, 8 ]), new Float32Array([ 12, -7, 8 ]) ],
    [ new Float32Array([ -18, -7, -2 ]), new Float32Array([ -18, -7, 8 ]),
      new Float32Array([ -18, 13, 8 ]), new Float32Array([ -18, 13, -2 ]) ]
  ]
  t.deepEqual(obs, exp)

  rotated = rotateY(-90, geometry)
  obs = geom3.toPoints(rotated)
  t.deepEqual(obs, exp)

  // rotate about Z
  rotated = rotate([0, 0, 180], geometry)
  obs = geom3.toPoints(rotated)
  exp = [
    [ new Float32Array([ 2, 7, -12 ]), new Float32Array([ 2, 7, 18 ]),
      new Float32Array([ 2, -13, 18 ]), new Float32Array([ 2, -13, -12 ]) ],
    [ new Float32Array([ -8, 7, -12 ]), new Float32Array([ -8, -13, -12 ]),
      new Float32Array([ -8, -13, 18 ]), new Float32Array([ -8, 7, 18 ]) ],
    [ new Float32Array([ 2, 7, -12 ]), new Float32Array([ -8, 7, -12 ]),
      new Float32Array([ -8, 7, 18 ]), new Float32Array([ 2, 7, 18 ]) ],
    [ new Float32Array([ 2, -13, -12 ]), new Float32Array([ 2, -13, 18 ]),
      new Float32Array([ -8, -13, 18 ]), new Float32Array([ -8, -13, -12 ]) ],
    [ new Float32Array([ 2, 7, -12 ]), new Float32Array([ 2, -13, -12 ]),
      new Float32Array([ -8, -13, -12 ]), new Float32Array([ -8, 7, -12 ]) ],
    [ new Float32Array([ 2, 7, 18 ]), new Float32Array([ -8, 7, 18 ]),
      new Float32Array([ -8, -13, 18 ]), new Float32Array([ 2, -13, 18 ]) ]
  ]
  t.deepEqual(obs, exp)

  rotated = rotateZ(180, geometry)
  obs = geom3.toPoints(rotated)
  t.deepEqual(obs, exp)
})

test('rotate: rotating of multiple objects produces expected changes', t => {
  let junk = 'hello'
  let geometry1 = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])
  let geometry2 = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  let rotated = rotate([0, 0, 90], junk, geometry1, geometry2)

  t.is(rotated[0], junk)

  let obs1 = path2.toPoints(rotated[1])
  let exp1 = [
    new Float32Array([ -5, -5 ]),
    new Float32Array([ -5, 5 ]),
    new Float32Array([ 5, -5 ]),
    new Float32Array([ 5, 10 ])
  ]
  t.deepEqual(obs1, exp1)

  let obs2 = geom2.toPoints(rotated[2])
  let exp2 = [
    new Float32Array([ 5, -5 ]),
    new Float32Array([ -5, 3.0616169991140216e-16 ]),
    new Float32Array([ 5, 10 ])
  ]
  t.true(comparePoints(obs2, exp2))
})
