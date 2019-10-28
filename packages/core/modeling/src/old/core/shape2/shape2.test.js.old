const test = require('ava')
const { create, fromPoints } = require('./index')
const mat4 = require('../../math/mat4')

test('shape2: create() should return an empty shape2', t => {
  const obs = create()
  const exp = {
    type: 'shape2',
    sides: [], // not sure if sides or curves will be kept (either or)
    curves: [], // not sure if sides or curves will be kept (either or)
    isCanonicalized: false,

    transforms: mat4.identity(),
    isNegative: false
  }
  t.deepEqual(obs, exp)
})

const shape2Equals = (shapeA, shapeB) => {
  const canonicalizedEqual = shapeA.isCanonicalized === shapeB.isCanonicalized
  const negativeEqual = shapeA.isNegative === shapeB.isNegative
  const transformsEqual = mat4.equals(shapeA.transforms, shapeB.transforms)
  const sidesEqual = shapeA.sides.length === shapeB.sides.length &&
    shapeA.sides.reduce((acc, side, index) => {
      const shapeASide = side.map(x => Array.from(x))
      const shapeBSide = shapeB.sides[index].map(x => Array.from(x))
      const foo = JSON.stringify(shapeASide) === JSON.stringify(shapeBSide) && acc
      return foo
    }, true)
  // console.log('sidesEqual', sidesEqual, canonicalizedEqual, negativeEqual, transformsEqual)
  return canonicalizedEqual && negativeEqual && transformsEqual && sidesEqual
}

test('shape2: fromPoints() should create a shape2 from points', t => {
  const points = [
    [-13, -13],
    [13, -13],
    [13, 13]
  ]
  const obs = fromPoints(points)
  const exp = {
    type: 'shape2',
    sides: [
      [ [ 13, 13 ], [ -13, -13 ] ],
      [ [ -13, -13 ], [ 13, -13 ] ],
      [ [ 13, -13 ], [ 13, 13 ] ]
    ],
    curves: [],
    isCanonicalized: true,

    transforms: mat4.identity(),
    isNegative: false
  }
  // console.log('foo', obs.sides)
  t.deepEqual(shape2Equals(obs, exp), true)
})
