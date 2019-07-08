const test = require('ava')

const mat4 = require('../../math/mat4')

const { geom2, geom3, path2 } = require('../../geometry')

const { transform } = require('./index')

test('transform: transforming of a path2 produces expected changes to points', t => {
  let matrix = mat4.fromTranslation([2, 2, 0])
  let geometry = path2.fromPoints({}, [[0, 0, 0], [1, 0, 0]])

  geometry = transform(matrix, geometry)
  let obs = path2.toPoints(geometry)
  let exp = [
    new Float32Array([2, 2]),
    new Float32Array([3, 2])
  ]
  t.deepEqual(obs, exp)
})

test('transform: transforming of a geom2 produces expected changes to sides', t => {
  let matrix = mat4.fromScaling([5, 5, 5])
  let geometry = geom2.fromPoints([[0, 0], [1, 0], [0, 1]])

  geometry = transform(matrix, geometry)
  let obs = geom2.toPoints(geometry)
  let exp = [
    new Float32Array([0, 0]),
    new Float32Array([5, 0]),
    new Float32Array([0, 5])
  ]

  t.deepEqual(obs, exp)
})

test('transform: transforming of a geom3 produces expected changes to polygons', t => {
  let matrix = mat4.fromTranslation([-3, -3, -3])
  let points = [
    [ [-2, -7, -12], [-2, -7, 18], [-2, 13, 18], [-2, 13, -12] ],
    [ [8, -7, -12], [8, 13, -12], [8, 13, 18], [8, -7, 18] ],
    [ [-2, -7, -12], [8, -7, -12], [8, -7, 18], [-2, -7, 18] ],
    [ [-2, 13, -12], [-2, 13, 18], [8, 13, 18], [8, 13, -12] ],
    [ [-2, -7, -12], [-2, 13, -12], [8, 13, -12], [8, -7, -12] ],
    [ [-2, -7, 18], [8, -7, 18], [8, 13, 18], [-2, 13, 18] ]
  ]
  let geometry = geom3.fromPoints(points)
  geometry = transform(matrix, geometry)
  let obs = geom3.toPoints(geometry)
  let exp = [
    [ new Float32Array([ -5, -10, -15 ]),
      new Float32Array([ -5, -10, 15 ]),
      new Float32Array([ -5, 10, 15 ]),
      new Float32Array([ -5, 10, -15 ]) ],
    [ new Float32Array([ 5, -10, -15 ]),
      new Float32Array([ 5, 10, -15 ]),
      new Float32Array([ 5, 10, 15 ]),
      new Float32Array([ 5, -10, 15 ]) ],
    [ new Float32Array([ -5, -10, -15 ]),
      new Float32Array([ 5, -10, -15 ]),
      new Float32Array([ 5, -10, 15 ]),
      new Float32Array([ -5, -10, 15 ]) ],
    [ new Float32Array([ -5, 10, -15 ]),
      new Float32Array([ -5, 10, 15 ]),
      new Float32Array([ 5, 10, 15 ]),
      new Float32Array([ 5, 10, -15 ]) ],
    [ new Float32Array([ -5, -10, -15 ]),
      new Float32Array([ -5, 10, -15 ]),
      new Float32Array([ 5, 10, -15 ]),
      new Float32Array([ 5, -10, -15 ]) ],
    [ new Float32Array([ -5, -10, 15 ]),
      new Float32Array([ 5, -10, 15 ]),
      new Float32Array([ 5, 10, 15 ]),
      new Float32Array([ -5, 10, 15 ]) ]
  ]
  t.deepEqual(obs, exp)
})

test('transform: transforming of multiple objects produces expected changes', t => {
  let junk = 'hello'
  let geometry1 = path2.fromPoints({}, [[-5, 5], [5, 5], [-5, -5], [10, -5]])
  let geometry2 = geom2.fromPoints([[-5, -5], [0, 5], [10, -5]])

  let matrix = mat4.fromTranslation([2, 2, 0])
  let transformed = transform(matrix, junk, geometry1, geometry2)
  t.is(transformed[0], junk)

  let obs = path2.toPoints(transformed[1])
  let exp = [
    new Float32Array([-3, 7]),
    new Float32Array([7, 7]),
    new Float32Array([-3, -3]),
    new Float32Array([12, -3])
  ]
  t.deepEqual(obs, exp)

  obs = geom2.toPoints(transformed[2])
  exp = [
    new Float32Array([-3, -3]),
    new Float32Array([2, 7]),
    new Float32Array([12, -3])
  ]
  t.deepEqual(obs, exp)
})
