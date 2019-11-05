const test = require('ava')
const rectangle = require('./rectangle')
const circle = require('./circle')
const polygon = require('./polygon')
const { sideEquals, shape2dToNestedArray, shape2dToOptimisedPoints } = require('../test-helpers')

/* FIXME : not entirely sure how to deal with this, but for now relies on inspecting
output data structures: we should have higher level primitives ... */

// helper functions
function comparePositonVertices (obs, exp) {
  for (let index = 0; index < obs.length; index++) {
    let side = obs[index]
    const same = side.vertex0.pos._x === exp[index][0][0] && side.vertex0.pos._y === exp[index][0][1] &&
      side.vertex1.pos._x === exp[index][1][0] && side.vertex1.pos._y === exp[index][1][1]
    // console.log('side', side.vertex0.pos, same)
    if (!same) {
      return false
    }
  }
  return true
}

test('rectangle (defaults)', t => {
  const obs = rectangle()
  const expSides = [ [ 0, 1 ], [ 0, 0 ], [ 1, 0 ], [ 1, 1 ] ]
  const obsSides = shape2dToOptimisedPoints(obs)

  t.deepEqual(obs.sides.length, 4)
  t.deepEqual(obsSides, expSides)
})

test('rectangle (custom size, 2d array parameter)', t => {
  const obs = rectangle([2, 3])

  const expSides = [ [0, 3], [0, 0], [2, 0], [2, 3] ]
  const obsSides = shape2dToOptimisedPoints(obs)

  t.deepEqual(obs.sides.length, 4)
  t.deepEqual(obsSides, expSides)
})

test('rectangle (custom size, size object parameter)', t => {
  const obs = rectangle({size: [2, 3]})

  const expSides = [ [0, 3], [0, 0], [2, 0], [2, 3] ]
  const obsSides = shape2dToOptimisedPoints(obs)

  t.deepEqual(obs.sides.length, 4)
  t.deepEqual(obsSides, expSides)
})

test('rectangle (default size, centered)', t => {
  const obs = rectangle({center: true})

  const expSides = [ [-0.5, 0.5], [-0.5, -0.5], [0.5, -0.5], [0.5, 0.5] ]

  const obsSides = shape2dToOptimisedPoints(obs)

  t.deepEqual(obs.sides.length, 4)
  t.deepEqual(obsSides, expSides)
})

test('rectangle (custom size, centered, boolean)', t => {
  const obs = rectangle({size: [2, 3], center: true})

  const expSides = [ [ -1, 1.5 ], [ -1, -1.5 ], [ 1, -1.5 ], [ 1, 1.5 ] ]
  const obsSides = shape2dToOptimisedPoints(obs)

  t.deepEqual(obs.sides.length, 4)
  t.deepEqual(obsSides, expSides)
})

test('rectangle (custom size, centered on one axis, boolean)', t => {
  const obs = rectangle({size: [2, 3], center: [true, false]})

  const expSides = [ [ -1, 3 ], [ -1, 0 ], [ 1, 0 ], [ 1, 3 ] ]
  const obsSides = shape2dToOptimisedPoints(obs)

  t.deepEqual(obs.sides.length, 4)
  t.deepEqual(obsSides, expSides)
})

test('rectangle (custom size, centered, position)', t => {
  const obs = rectangle({size: [2, 3], center: [-1, 2]})

  const expSides = [ [ -2, 3.5 ], [ -2, 0.5 ], [ 0, 0.5 ], [ 0, 3.5 ] ]
  const obsSides = shape2dToOptimisedPoints(obs)
  t.deepEqual(obs.sides.length, 4)
  t.deepEqual(obsSides, expSides)
})

test('circle (defaults)', t => {
  const obs = circle()

  // points that make up our circle
  const expected = [ [ 1.9807852804032304, 0.8049096779838713, 2, 1 ],
  [ 2, 1, 1.9807852804032304, 1.1950903220161282 ],
    [ 1.9807852804032304,
      1.1950903220161282,
      1.9238795325112867,
      1.3826834323650898 ],
    [ 1.9238795325112867,
      1.3826834323650898,
      1.8314696123025453,
      1.5555702330196022 ],
    [ 1.8314696123025453,
      1.5555702330196022,
      1.7071067811865475,
      1.7071067811865475 ],
    [ 1.7071067811865475,
      1.7071067811865475,
      1.5555702330196022,
      1.8314696123025453 ],
    [ 1.5555702330196022,
      1.8314696123025453,
      1.3826834323650898,
      1.9238795325112867 ],
    [ 1.3826834323650898,
      1.9238795325112867,
      1.1950903220161284,
      1.9807852804032304 ],
  [ 1.1950903220161284, 1.9807852804032304, 1, 2 ],
  [ 1, 2, 0.8049096779838718, 1.9807852804032304 ],
    [ 0.8049096779838718,
      1.9807852804032304,
      0.6173165676349103,
      1.9238795325112867 ],
    [ 0.6173165676349103,
      1.9238795325112867,
      0.44442976698039804,
      1.8314696123025453 ],
    [ 0.44442976698039804,
      1.8314696123025453,
      0.29289321881345254,
      1.7071067811865475 ],
    [ 0.29289321881345254,
      1.7071067811865475,
      0.16853038769745465,
      1.5555702330196022 ],
    [ 0.16853038769745465,
      1.5555702330196022,
      0.07612046748871326,
      1.3826834323650898 ],
    [ 0.07612046748871326,
      1.3826834323650898,
      0.01921471959676957,
      1.1950903220161286 ],
  [ 0.01921471959676957, 1.1950903220161286, 0, 1.0000000000000002 ],
  [ 0, 1.0000000000000002, 0.01921471959676957, 0.8049096779838716 ],
    [ 0.01921471959676957,
      0.8049096779838716,
      0.07612046748871315,
      0.6173165676349104 ],
    [ 0.07612046748871315,
      0.6173165676349104,
      0.16853038769745454,
      0.44442976698039804 ],
    [ 0.16853038769745454,
      0.44442976698039804,
      0.2928932188134523,
      0.29289321881345254 ],
    [ 0.2928932188134523,
      0.29289321881345254,
      0.4444297669803978,
      0.16853038769745476 ],
    [ 0.4444297669803978,
      0.16853038769745476,
      0.6173165676349097,
      0.07612046748871348 ],
    [ 0.6173165676349097,
      0.07612046748871348,
      0.8049096779838714,
      0.01921471959676968 ],
  [ 0.8049096779838714, 0.01921471959676968, 0.9999999999999998, 0 ],
  [ 0.9999999999999998, 0, 1.1950903220161284, 0.01921471959676957 ],
    [ 1.1950903220161284,
      0.01921471959676957,
      1.38268343236509,
      0.07612046748871337 ],
    [ 1.38268343236509,
      0.07612046748871337,
      1.5555702330196017,
      0.16853038769745454 ],
    [ 1.5555702330196017,
      0.16853038769745454,
      1.7071067811865475,
      0.2928932188134523 ],
    [ 1.7071067811865475,
      0.2928932188134523,
      1.8314696123025453,
      0.4444297669803978 ],
    [ 1.8314696123025453,
      0.4444297669803978,
      1.9238795325112865,
      0.6173165676349096 ],
    [ 1.9238795325112865,
      0.6173165676349096,
      1.9807852804032304,
      0.8049096779838713 ] ]

  // console.log('foo', obsSides)

  t.deepEqual(obs.sides.length, 32)
  t.deepEqual(shape2dToNestedArray(obs), expected)
})

test('circle (custom radius)', t => {
  const obs = circle(10)

  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 32)
  sideEquals(t, obs.sides[0], [[19.8078528040323, 8.049096779838713], [20, 10]])
  sideEquals(t, obs.sides[obs.sides.length - 1], [[19.238795325112864, 6.173165676349096], [19.8078528040323, 8.049096779838713]])
})

test('circle (custom radius, object as parameter)', t => {
  const obs = circle({r: 10})

  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 32)
  sideEquals(t, obs.sides[0], [[19.8078528040323, 8.049096779838713], [20, 10]])
  sideEquals(t, obs.sides[obs.sides.length - 1], [[19.238795325112864, 6.173165676349096], [19.8078528040323, 8.049096779838713]])
})

test('circle (custom radius, custom resolution, object as parameter)', t => {
  const obs = circle({r: 10, fn: 5})

  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 5)
  sideEquals(t, obs.sides[0], [[13.090169943749473, 0.4894348370484636], [20, 10]])
  sideEquals(t, obs.sides[obs.sides.length - 1], [[1.9098300562505255, 4.12214747707527], [13.090169943749473, 0.4894348370484636]])
})

test('circle (custom radius, custom resolution, centered object as parameter)', t => {
  const obs = circle({center: true, r: 10, fn: 5})

  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 5)
  sideEquals(t, obs.sides[0], [[3.0901699437494723, -9.510565162951536], [10, 0]])
  sideEquals(t, obs.sides[obs.sides.length - 1], [[-8.090169943749475, -5.87785252292473], [3.0901699437494723, -9.510565162951536]])
})

// polygone
const trianglePoints = [[10, 11], [0, 11], [5, 20]]
const squarePoints = [[0, 0], [10, 0], [10, 10], [0, 10]]
const houseNestedPoints = [trianglePoints, squarePoints]
const houseFlatPoints = trianglePoints.concat(squarePoints)

const triangleSides = [[[5, 20], [0, 11]], [[0, 11], [10, 11]], [[10, 11], [5, 20]]]
const squareSides = [[[0, 10], [0, 0]], [[0, 0], [10, 0]], [[10, 0], [10, 10]], [[10, 10], [0, 10]]]
const houseSides = squareSides.concat(triangleSides)

test('polygon (points[])', t => {
  const obs = polygon(squarePoints)
  t.deepEqual(obs.sides.length, squareSides.length)
  t.truthy(comparePositonVertices(obs.sides, squareSides))
})

test('polygon (points[][])', t => {
  const obs = polygon(houseNestedPoints)
  t.deepEqual(obs.sides.length, houseSides.length)
  t.truthy(comparePositonVertices(obs.sides, houseSides))
})

test('polygon (params.points[])', t => {
  const obs = polygon({ points: squarePoints })
  t.deepEqual(obs.sides.length, squareSides.length)
  t.truthy(comparePositonVertices(obs.sides, squareSides))
})

test('polygon (params.points[][])', t => {
  const obs = polygon({ points: houseNestedPoints })
  t.deepEqual(obs.sides.length, houseSides.length)
  t.truthy(comparePositonVertices(obs.sides, houseSides))
})

test('polygon (params.points[], params.paths[])', t => {
  const obs = polygon({ points: squarePoints, paths: [0, 1, 2, 3] })
  t.deepEqual(obs.sides.length, squareSides.length)
  t.truthy(comparePositonVertices(obs.sides, squareSides))
})

test('polygon (params.points[], params.paths[] - partial path)', t => {
  // get the square from flat house points list
  const obs = polygon({ points: houseFlatPoints, paths: [3, 4, 5, 6] })
  t.deepEqual(obs.sides.length, squareSides.length)
  t.truthy(comparePositonVertices(obs.sides, squareSides))
})

test('polygon (params.points[][], params.paths[][] - two paths)', t => {
  // get the square and the triangle from nested house points list
  const obs = polygon({ points: houseNestedPoints, paths: [[0, 1, 2], [3, 4, 5, 6]] })
  t.deepEqual(obs.sides.length, houseSides.length)
  t.truthy(comparePositonVertices(obs.sides, houseSides))
})

test('polygon (nested points array, with holes)', t => {
  const obs = polygon([
    [ [0,0], [0,10], [10,10], [10,0] ],
    [ [2,2], [2,8], [8,8], [8,2] ],
    [ [3,3], [3,7], [7,7], [7,3] ],
    [ [4,4], [4,6], [6,6], [6,4] ]
  ])

  const expSides = [
    [ [7,3], [7,7] ],
    [ [7,7], [3,7] ],
    [ [3,7], [3,3] ],
    [ [3,3], [7,3] ],
    [ [6,6], [6,4] ],
    [ [4,6], [6,6] ],
    [ [4,4], [4,6] ],
    [ [6,4], [4,4] ],
    [ [10,0], [10,10] ],
    [ [10,10], [0,10] ],
    [ [0,10], [0,0] ],
    [ [0,0], [10,0] ],
    [ [8,8], [8,2] ],
    [ [2,8], [8,8] ],
    [ [2,2], [2,8] ],
    [ [8,2], [2,2] ]
  ]

  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 16)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('polygon (nested points array, with single path)', t => {
  const obs = polygon([ [ [0,0], [0,10], [10,10], [10,0] ] ])

  const expSides = [
    [ [10,0], [10,10] ],
    [ [10,10], [0,10] ],
    [ [0,10], [0,0] ],
    [ [0,0], [10,0] ]
  ]

  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 4)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})
