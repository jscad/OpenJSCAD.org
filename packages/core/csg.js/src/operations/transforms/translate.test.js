const test = require('ava')

const { geom2, geom3, path2 } = require('../../geometry')

const { translate, translateX, translateY, translateZ } = require('./index')

test('translate: translating of a path2 produces expected changes to points', t => {
  let line = path2.fromPoints({}, [[0, 0], [1, 0]])

  // translate X
  let translated = translate([1, 0, 0], line)
  let obs = path2.toPoints(translated)
  let exp = [
    new Float32Array([1, 0]),
    new Float32Array([2, 0])
  ]
  t.deepEqual(obs, exp)

  translated = translateX(1, line)
  obs = path2.toPoints(translated)
  t.deepEqual(obs, exp)

  // translate Y
  translated = translate([0, 1, 0], line)
  obs = path2.toPoints(translated)
  exp = [
    new Float32Array([0, 1]),
    new Float32Array([1, 1])
  ]
  t.deepEqual(obs, exp)

  translated = translateY(1, line)
  obs = path2.toPoints(translated)
  t.deepEqual(obs, exp)
})

test('translate: translating of a geom2 produces expected changes to points', t => {
  let geometry = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])

  // translate X
  let translated = translate([1, 0, 0], geometry)
  let obs = geom2.toPoints(translated)
  let exp = [
    new Float32Array([1, 0]),
    new Float32Array([2, 0]),
    new Float32Array([1, 1])
  ]
  t.deepEqual(obs, exp)

  translated = translateX(1, geometry)
  obs = geom2.toPoints(translated)
  t.deepEqual(obs, exp)

  // translate Y
  translated = translate([0, 1, 0], geometry)
  obs = geom2.toPoints(translated)
  exp = [
    new Float32Array([0, 1]),
    new Float32Array([1, 1]),
    new Float32Array([0, 2])
  ]
  t.deepEqual(obs, exp)

  translated = translateY(1, geometry)
  obs = geom2.toPoints(translated)
  t.deepEqual(obs, exp)
})

test('translate: translating of a geom3 produces expected changes to polygons', t => {
  let points = [
    [ [-2, -7, -12], [-2, -7, 18], [-2, 13, 18], [-2, 13, -12] ],
    [ [8, -7, -12], [8, 13, -12], [8, 13, 18], [8, -7, 18] ],
    [ [-2, -7, -12], [8, -7, -12], [8, -7, 18], [-2, -7, 18] ],
    [ [-2, 13, -12], [-2, 13, 18], [8, 13, 18], [8, 13, -12] ],
    [ [-2, -7, -12], [-2, 13, -12], [8, 13, -12], [8, -7, -12] ],
    [ [-2, -7, 18], [8, -7, 18], [8, 13, 18], [-2, 13, 18] ]
  ]
  let geometry = geom3.fromPoints(points)

  // translate X
  let translated = translate([3, 0, 0], geometry)
  let obs = geom3.toPoints(translated)
  let exp = [
    [ new Float32Array([ 1, -7, -12 ]), new Float32Array([ 1, -7, 18 ]),
      new Float32Array([ 1, 13, 18 ]), new Float32Array([ 1, 13, -12 ]) ],
    [ new Float32Array([ 11, -7, -12 ]), new Float32Array([ 11, 13, -12 ]),
      new Float32Array([ 11, 13, 18 ]), new Float32Array([ 11, -7, 18 ]) ],
    [ new Float32Array([ 1, -7, -12 ]), new Float32Array([ 11, -7, -12 ]),
      new Float32Array([ 11, -7, 18 ]), new Float32Array([ 1, -7, 18 ]) ],
    [ new Float32Array([ 1, 13, -12 ]), new Float32Array([ 1, 13, 18 ]),
      new Float32Array([ 11, 13, 18 ]), new Float32Array([ 11, 13, -12 ]) ],
    [ new Float32Array([ 1, -7, -12 ]), new Float32Array([ 1, 13, -12 ]),
      new Float32Array([ 11, 13, -12 ]), new Float32Array([ 11, -7, -12 ]) ],
    [ new Float32Array([ 1, -7, 18 ]), new Float32Array([ 11, -7, 18 ]),
      new Float32Array([ 11, 13, 18 ]), new Float32Array([ 1, 13, 18 ]) ]
  ]
  t.deepEqual(obs, exp)

  translated = translateX(3, geometry)
  obs = geom3.toPoints(translated)
  t.deepEqual(obs, exp)

  // translated Y
  translated = translate([0, 3, 0], geometry)
  obs = geom3.toPoints(translated)
  exp = [
    [ new Float32Array([ -2, -4, -12 ]), new Float32Array([ -2, -4, 18 ]),
      new Float32Array([ -2, 16, 18 ]), new Float32Array([ -2, 16, -12 ]) ],
    [ new Float32Array([ 8, -4, -12 ]), new Float32Array([ 8, 16, -12 ]),
      new Float32Array([ 8, 16, 18 ]), new Float32Array([ 8, -4, 18 ]) ],
    [ new Float32Array([ -2, -4, -12 ]), new Float32Array([ 8, -4, -12 ]),
      new Float32Array([ 8, -4, 18 ]), new Float32Array([ -2, -4, 18 ]) ],
    [ new Float32Array([ -2, 16, -12 ]), new Float32Array([ -2, 16, 18 ]),
      new Float32Array([ 8, 16, 18 ]), new Float32Array([ 8, 16, -12 ]) ],
    [ new Float32Array([ -2, -4, -12 ]), new Float32Array([ -2, 16, -12 ]),
      new Float32Array([ 8, 16, -12 ]), new Float32Array([ 8, -4, -12 ]) ],
    [ new Float32Array([ -2, -4, 18 ]), new Float32Array([ 8, -4, 18 ]),
      new Float32Array([ 8, 16, 18 ]), new Float32Array([ -2, 16, 18 ]) ]
  ]
  t.deepEqual(obs, exp)

  translated = translateY(3, geometry)
  obs = geom3.toPoints(translated)
  t.deepEqual(obs, exp)

  // translate Z
  translated = translate([0, 0, 3], geometry)
  obs = geom3.toPoints(translated)
  exp = [
    [ new Float32Array([ -2, -7, -9 ]), new Float32Array([ -2, -7, 21 ]),
      new Float32Array([ -2, 13, 21 ]), new Float32Array([ -2, 13, -9 ]) ],
    [ new Float32Array([ 8, -7, -9 ]), new Float32Array([ 8, 13, -9 ]),
      new Float32Array([ 8, 13, 21 ]), new Float32Array([ 8, -7, 21 ]) ],
    [ new Float32Array([ -2, -7, -9 ]), new Float32Array([ 8, -7, -9 ]),
      new Float32Array([ 8, -7, 21 ]), new Float32Array([ -2, -7, 21 ]) ],
    [ new Float32Array([ -2, 13, -9 ]), new Float32Array([ -2, 13, 21 ]),
      new Float32Array([ 8, 13, 21 ]), new Float32Array([ 8, 13, -9 ]) ],
    [ new Float32Array([ -2, -7, -9 ]), new Float32Array([ -2, 13, -9 ]),
      new Float32Array([ 8, 13, -9 ]), new Float32Array([ 8, -7, -9 ]) ],
    [ new Float32Array([ -2, -7, 21 ]), new Float32Array([ 8, -7, 21 ]),
      new Float32Array([ 8, 13, 21 ]), new Float32Array([ -2, 13, 21 ]) ]
  ]
  t.deepEqual(obs, exp)

  translated = translateZ(3, geometry)
  obs = geom3.toPoints(translated)
  t.deepEqual(obs, exp)
})

test('translate: translating of multiple objects produces expected changes', t => {
  let junk = 'hello'
  let geometry1 = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])
  let geometry2 = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  let translated = translate([3, 3, 3], junk, geometry1, geometry2)
  t.is(translated[0], junk)

  let obs = path2.toPoints(translated[1])
  let exp = [
    new Float32Array([ -2, 8 ]),
    new Float32Array([ 8, 8 ]),
    new Float32Array([ -2, -2 ]),
    new Float32Array([ 13, -2 ])
  ]
  t.deepEqual(obs, exp)

  obs = geom2.toPoints(translated[2])
  exp = [
    new Float32Array([ -2, -2 ]),
    new Float32Array([ 3, 8 ]),
    new Float32Array([ 13, -2 ])
  ]
  t.deepEqual(obs, exp)
})
