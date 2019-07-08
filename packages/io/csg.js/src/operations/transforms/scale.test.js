const test = require('ava')

const { geom2, geom3, path2 } = require('../../geometry')

const { scale, scaleX, scaleY, scaleZ } = require('./index')

test('scale: scaling of a path2 produces expected changes to points', t => {
  let geometry = path2.fromPoints({}, [[0, 4], [1, 0]])

  // scale X
  let scaled = scale([3, 1, 1], geometry)
  let obs = path2.toPoints(scaled)
  let exp = [
    new Float32Array([0, 4]),
    new Float32Array([3, 0])
  ]
  t.deepEqual(obs, exp)

  scaled = scaleX(3, geometry)
  obs = path2.toPoints(scaled)
  t.deepEqual(obs, exp)

  // scale Y
  scaled = scale([1, 0.5, 1], geometry)
  obs = path2.toPoints(scaled)
  exp = [
    new Float32Array([0, 2]),
    new Float32Array([1, 0])
  ]
  t.deepEqual(obs, exp)

  scaled = scaleY(0.5, geometry)
  obs = path2.toPoints(scaled)
  t.deepEqual(obs, exp)
})

test('scale: scaling of a geom2 produces expected changes to points', t => {
  let geometry = geom2.fromPoints([[-1, 0], [1, 0], [0, 1]])

  // scale X
  let scaled = scale([3, 1, 1], geometry)
  let obs = geom2.toPoints(scaled)
  let exp = [
    new Float32Array([-3, 0]),
    new Float32Array([3, 0]),
    new Float32Array([0, 1])
  ]
  t.deepEqual(obs, exp)

  scaled = scaleX(3, geometry)
  obs = geom2.toPoints(scaled)
  t.deepEqual(obs, exp)

  // scale Y
  scaled = scale([1, 3, 1], geometry)
  obs = geom2.toPoints(scaled)
  exp = [
    new Float32Array([-1, 0]),
    new Float32Array([1, 0]),
    new Float32Array([0, 3])
  ]
  t.deepEqual(obs, exp)

  scaled = scaleY(3, geometry)
  obs = geom2.toPoints(scaled)
  t.deepEqual(obs, exp)
})

test('scale: scaling of a geom3 produces expected changes to polygons', t => {
  let points = [
    [ [-2, -7, -12], [-2, -7, 18], [-2, 13, 18], [-2, 13, -12] ],
    [ [8, -7, -12], [8, 13, -12], [8, 13, 18], [8, -7, 18] ],
    [ [-2, -7, -12], [8, -7, -12], [8, -7, 18], [-2, -7, 18] ],
    [ [-2, 13, -12], [-2, 13, 18], [8, 13, 18], [8, 13, -12] ],
    [ [-2, -7, -12], [-2, 13, -12], [8, 13, -12], [8, -7, -12] ],
    [ [-2, -7, 18], [8, -7, 18], [8, 13, 18], [-2, 13, 18] ]
  ]
  let geometry = geom3.fromPoints(points)

  // scale X
  let scaled = scale([3, 1, 1], geometry)
  let obs = geom3.toPoints(scaled)
  let exp = [
    [ new Float32Array([ -6, -7, -12 ]), new Float32Array([ -6, -7, 18 ]),
      new Float32Array([ -6, 13, 18 ]), new Float32Array([ -6, 13, -12 ]) ],
    [ new Float32Array([ 24, -7, -12 ]), new Float32Array([ 24, 13, -12 ]),
      new Float32Array([ 24, 13, 18 ]), new Float32Array([ 24, -7, 18 ]) ],
    [ new Float32Array([ -6, -7, -12 ]), new Float32Array([ 24, -7, -12 ]),
      new Float32Array([ 24, -7, 18 ]), new Float32Array([ -6, -7, 18 ]) ],
    [ new Float32Array([ -6, 13, -12 ]), new Float32Array([ -6, 13, 18 ]),
      new Float32Array([ 24, 13, 18 ]), new Float32Array([ 24, 13, -12 ]) ],
    [ new Float32Array([ -6, -7, -12 ]), new Float32Array([ -6, 13, -12 ]),
      new Float32Array([ 24, 13, -12 ]), new Float32Array([ 24, -7, -12 ]) ],
    [ new Float32Array([ -6, -7, 18 ]), new Float32Array([ 24, -7, 18 ]),
      new Float32Array([ 24, 13, 18 ]), new Float32Array([ -6, 13, 18 ]) ]
  ]
  t.deepEqual(obs, exp)

  scaled = scaleX(3, geometry)
  obs = geom3.toPoints(scaled)
  t.deepEqual(obs, exp)

  // scale Y
  scaled = scale([1, 0.5, 1], geometry)
  obs = geom3.toPoints(scaled)
  exp = [
    [ new Float32Array([ -2, -3.5, -12 ]), new Float32Array([ -2, -3.5, 18 ]),
      new Float32Array([ -2, 6.5, 18 ]), new Float32Array([ -2, 6.5, -12 ]) ],
    [ new Float32Array([ 8, -3.5, -12 ]), new Float32Array([ 8, 6.5, -12 ]),
      new Float32Array([ 8, 6.5, 18 ]), new Float32Array([ 8, -3.5, 18 ]) ],
    [ new Float32Array([ -2, -3.5, -12 ]), new Float32Array([ 8, -3.5, -12 ]),
      new Float32Array([ 8, -3.5, 18 ]), new Float32Array([ -2, -3.5, 18 ]) ],
    [ new Float32Array([ -2, 6.5, -12 ]), new Float32Array([ -2, 6.5, 18 ]),
      new Float32Array([ 8, 6.5, 18 ]), new Float32Array([ 8, 6.5, -12 ]) ],
    [ new Float32Array([ -2, -3.5, -12 ]), new Float32Array([ -2, 6.5, -12 ]),
      new Float32Array([ 8, 6.5, -12 ]), new Float32Array([ 8, -3.5, -12 ]) ],
    [ new Float32Array([ -2, -3.5, 18 ]), new Float32Array([ 8, -3.5, 18 ]),
      new Float32Array([ 8, 6.5, 18 ]), new Float32Array([ -2, 6.5, 18 ]) ]
  ]
  t.deepEqual(obs, exp)

  scaled = scaleY(0.5, geometry)
  obs = geom3.toPoints(scaled)
  t.deepEqual(obs, exp)

  // scale Z
  scaled = scale([1, 1, 5], geometry)
  obs = geom3.toPoints(scaled)
  exp = [
    [ new Float32Array([ -2, -7, -60 ]),
      new Float32Array([ -2, -7, 90 ]),
      new Float32Array([ -2, 13, 90 ]),
      new Float32Array([ -2, 13, -60 ]) ],
    [ new Float32Array([ 8, -7, -60 ]),
      new Float32Array([ 8, 13, -60 ]),
      new Float32Array([ 8, 13, 90 ]),
      new Float32Array([ 8, -7, 90 ]) ],
    [ new Float32Array([ -2, -7, -60 ]),
      new Float32Array([ 8, -7, -60 ]),
      new Float32Array([ 8, -7, 90 ]),
      new Float32Array([ -2, -7, 90 ]) ],
    [ new Float32Array([ -2, 13, -60 ]),
      new Float32Array([ -2, 13, 90 ]),
      new Float32Array([ 8, 13, 90 ]),
      new Float32Array([ 8, 13, -60 ]) ],
    [ new Float32Array([ -2, -7, -60 ]),
      new Float32Array([ -2, 13, -60 ]),
      new Float32Array([ 8, 13, -60 ]),
      new Float32Array([ 8, -7, -60 ]) ],
    [ new Float32Array([ -2, -7, 90 ]),
      new Float32Array([ 8, -7, 90 ]),
      new Float32Array([ 8, 13, 90 ]),
      new Float32Array([ -2, 13, 90 ]) ]
  ]
  t.deepEqual(obs, exp)

  scaled = scaleZ(5, geometry)
  obs = geom3.toPoints(scaled)
  t.deepEqual(obs, exp)
})

test('scale: scaling of multiple objects produces expected changes', t => {
  let junk = 'hello'
  let geometry1 = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])
  let geometry2 = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  let scaled = scale([3, 1, 1], junk, geometry1, geometry2)

  t.is(scaled[0], junk)

  let obs1 = path2.toPoints(scaled[1])
  let exp1 = [
    new Float32Array([ -15, 5 ]),
    new Float32Array([ 15, 5 ]),
    new Float32Array([ -15, -5 ]),
    new Float32Array([ 30, -5 ])
  ]
  t.deepEqual(obs1, exp1)

  let obs2 = geom2.toPoints(scaled[2])
  let exp2 = [
    new Float32Array([ -15, -5 ]),
    new Float32Array([ 0, 5 ]),
    new Float32Array([ 30, -5 ])
  ]
  t.deepEqual(obs2, exp2)
})
