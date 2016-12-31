import test from 'ava'
import { square, circle, triangle, polygon } from './primitives2d'

/* FIXME : not entirely sure how to deal with this, but for now relies on inspecting
output data structures: we should have higher level primitives ...*/

// helper functions
function comparePositonVertices (obs, exp) {
  for (let index = 0; index < obs.length; index++) {
    let side = obs[index]
    const same = side.vertex0.pos._x === exp[index][0][0] && side.vertex0.pos._y === exp[index][0][1]
      && side.vertex1.pos._x === exp[index][1][0] && side.vertex1.pos._y === exp[index][1][1]
    // console.log('side', side.vertex0.pos, same)
    if (!same) {
      return false
    }
  }
  return true
}

test('triangle (defaults)', t => {
  const obs = triangle()

  const expSides = [
    [[0, 1], [0, 0]],
    [[0, 0], [1, 0]],
    [[1, 0], [1, 1]]
  ]
  t.deepEqual(obs.sides.length, 3)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('triangle (custom size)', t => {
  const obs = triangle(5)

  const expSides = [
    [[0, 1], [0, 0]],
    [[0, 0], [1, 0]],
    [[1, 0], [1, 1]]
  ]
  t.deepEqual(obs.sides.length, 3)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('square (defaults)', t => {
  const obs = square()

  const expSides = [
    [[0, 1], [0, 0]],
    [[0, 0], [1, 0]],
    [[1, 0], [1, 1]],
    [[1, 1], [0, 1]]
  ]
  t.deepEqual(obs.sides.length, 4)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('square (custom size, 2d array parameter)', t => {
  const obs = square([2, 3])

  const expSides = [
    [[0, 3], [0, 0]],
    [[0, 0], [2, 0]],
    [[2, 0], [2, 3]],
    [[2, 3], [0, 3]]
  ]

  t.deepEqual(obs.sides.length, 4)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('square (custom size, size object parameter)', t => {
  const obs = square({size: [2, 3]})

  const expSides = [
    [[0, 3], [0, 0]],
    [[0, 0], [2, 0]],
    [[2, 0], [2, 3]],
    [[2, 3], [0, 3]]
  ]

  t.deepEqual(obs.sides.length, 4)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('square (default size, centered)', t => {
  const obs = square({center: true})

  const expSides = [
    [[0, 1], [0, 0]],
    [[0, 0], [1, 0]],
    [[1, 0], [1, 1]],
    [[1, 1], [0, 1]]
  ]

  t.deepEqual(obs.sides.length, 4)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('square (custom size, centered)', t => {
  const obs = square({size: [2, 3], center: true})

  const expSides = [ [ [ -1, 1.5 ], [ -1, -1.5 ] ],
  [ [ -1, -1.5 ], [ 1, -1.5 ] ],
  [ [ 1, -1.5 ], [ 1, 1.5 ] ],
  [ [ 1, 1.5 ], [ -1, 1.5 ] ] ]

  const gla = obs.sides.map(function (side) {
    return [[side.vertex0.pos._x, side.vertex0.pos._y], [side.vertex1.pos._x, side.vertex1.pos._y]]
  })
  console.log(gla)

  t.deepEqual(obs.sides.length, 4)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('circle (defaults)', t => {
  const obs = circle()

  const expSides = [ [ [ 2, 1 ], [ 1.9807852804032304, 1.1950903220161282 ] ],
    [ [ 1.9807852804032304, 1.1950903220161282 ],
      [ 1.9238795325112867, 1.3826834323650898 ] ],
    [ [ 1.9238795325112867, 1.3826834323650898 ],
      [ 1.8314696123025453, 1.5555702330196022 ] ],
    [ [ 1.8314696123025453, 1.5555702330196022 ],
      [ 1.7071067811865475, 1.7071067811865475 ] ],
    [ [ 1.7071067811865475, 1.7071067811865475 ],
      [ 1.5555702330196022, 1.8314696123025453 ] ],
    [ [ 1.5555702330196022, 1.8314696123025453 ],
      [ 1.3826834323650898, 1.9238795325112867 ] ],
    [ [ 1.3826834323650898, 1.9238795325112867 ],
      [ 1.1950903220161284, 1.9807852804032304 ] ],
    [ [ 1.1950903220161284, 1.9807852804032304 ], [ 1, 2 ] ],
    [ [ 1, 2 ], [ 0.8049096779838718, 1.9807852804032304 ] ],
    [ [ 0.8049096779838718, 1.9807852804032304 ],
      [ 0.6173165676349103, 1.9238795325112867 ] ],
    [ [ 0.6173165676349103, 1.9238795325112867 ],
      [ 0.44442976698039804, 1.8314696123025453 ] ],
    [ [ 0.44442976698039804, 1.8314696123025453 ],
      [ 0.29289321881345254, 1.7071067811865475 ] ],
    [ [ 0.29289321881345254, 1.7071067811865475 ],
      [ 0.16853038769745465, 1.5555702330196022 ] ],
    [ [ 0.16853038769745465, 1.5555702330196022 ],
      [ 0.07612046748871326, 1.3826834323650898 ] ],
    [ [ 0.07612046748871326, 1.3826834323650898 ],
      [ 0.01921471959676957, 1.1950903220161286 ] ],
    [ [ 0.01921471959676957, 1.1950903220161286 ],
      [ 0, 1.0000000000000002 ] ],
    [ [ 0, 1.0000000000000002 ],
      [ 0.01921471959676957, 0.8049096779838716 ] ],
    [ [ 0.01921471959676957, 0.8049096779838716 ],
      [ 0.07612046748871315, 0.6173165676349104 ] ],
    [ [ 0.07612046748871315, 0.6173165676349104 ],
      [ 0.16853038769745454, 0.44442976698039804 ] ],
    [ [ 0.16853038769745454, 0.44442976698039804 ],
      [ 0.2928932188134523, 0.29289321881345254 ] ],
    [ [ 0.2928932188134523, 0.29289321881345254 ],
      [ 0.4444297669803978, 0.16853038769745476 ] ],
    [ [ 0.4444297669803978, 0.16853038769745476 ],
      [ 0.6173165676349097, 0.07612046748871348 ] ],
    [ [ 0.6173165676349097, 0.07612046748871348 ],
      [ 0.8049096779838714, 0.01921471959676968 ] ],
    [ [ 0.8049096779838714, 0.01921471959676968 ],
      [ 0.9999999999999998, 0 ] ],
    [ [ 0.9999999999999998, 0 ],
      [ 1.1950903220161284, 0.01921471959676957 ] ],
    [ [ 1.1950903220161284, 0.01921471959676957 ],
      [ 1.38268343236509, 0.07612046748871337 ] ],
    [ [ 1.38268343236509, 0.07612046748871337 ],
      [ 1.5555702330196017, 0.16853038769745454 ] ],
    [ [ 1.5555702330196017, 0.16853038769745454 ],
      [ 1.7071067811865475, 0.2928932188134523 ] ],
    [ [ 1.7071067811865475, 0.2928932188134523 ],
      [ 1.8314696123025453, 0.4444297669803978 ] ],
    [ [ 1.8314696123025453, 0.4444297669803978 ],
      [ 1.9238795325112865, 0.6173165676349096 ] ],
    [ [ 1.9238795325112865, 0.6173165676349096 ],
      [ 1.9807852804032304, 0.8049096779838713 ] ],
    [ [ 1.9807852804032304, 0.8049096779838713 ],
      [ 2, 0.9999999999999998 ] ] ]

  t.deepEqual(obs.sides.length, 32)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('circle (custom radius)', t => {
  const obs = circle(10)

  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 32)
  t.deepEqual(obs.sides[0].vertex0.pos._x, 20)
  t.deepEqual(obs.sides[0].vertex0.pos._y, 10)
  t.deepEqual(obs.sides[0].vertex1.pos._x, 19.807852804032304)
  t.deepEqual(obs.sides[0].vertex1.pos._y, 11.950903220161283)

  t.deepEqual(obs.sides[31].vertex0.pos._x, 19.8078528040323)
  t.deepEqual(obs.sides[31].vertex0.pos._y, 8.049096779838713)
  t.deepEqual(obs.sides[31].vertex1.pos._x, 20)
  t.deepEqual(obs.sides[31].vertex1.pos._y, 9.999999999999998)
})

test('circle (custom radius, object as parameter)', t => {
  const obs = circle({r: 10})

  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 32)
  t.deepEqual(obs.sides[0].vertex0.pos._x, 20)
  t.deepEqual(obs.sides[0].vertex0.pos._y, 10)
  t.deepEqual(obs.sides[0].vertex1.pos._x, 19.807852804032304)
  t.deepEqual(obs.sides[0].vertex1.pos._y, 11.950903220161283)

  t.deepEqual(obs.sides[31].vertex0.pos._x, 19.8078528040323)
  t.deepEqual(obs.sides[31].vertex0.pos._y, 8.049096779838713)
  t.deepEqual(obs.sides[31].vertex1.pos._x, 20)
  t.deepEqual(obs.sides[31].vertex1.pos._y, 9.999999999999998)
})

test('circle (custom radius, custom resolution, object as parameter)', t => {
  const obs = circle({r: 10, fn: 5})

  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 5)
  t.deepEqual(obs.sides[0].vertex0.pos._x, 20)
  t.deepEqual(obs.sides[0].vertex0.pos._y, 10)
  t.deepEqual(obs.sides[0].vertex1.pos._x, 13.090169943749475)
  t.deepEqual(obs.sides[0].vertex1.pos._y, 19.510565162951536)

  t.deepEqual(obs.sides[4].vertex0.pos._x, 13.090169943749473)
  t.deepEqual(obs.sides[4].vertex0.pos._y, 0.4894348370484636)
  t.deepEqual(obs.sides[4].vertex1.pos._x, 20)
  t.deepEqual(obs.sides[4].vertex1.pos._y, 9.999999999999998)
})

test('circle (custom radius, custom resolution, centered object as parameter)', t => {
  const obs = circle({center: true, r: 10, fn: 5})

  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 5)
  t.deepEqual(obs.sides[0].vertex0.pos._x, 10)
  t.deepEqual(obs.sides[0].vertex0.pos._y, 0)
  t.deepEqual(obs.sides[0].vertex1.pos._x, 3.0901699437494745)
  t.deepEqual(obs.sides[0].vertex1.pos._y, 9.510565162951535)

  t.deepEqual(obs.sides[4].vertex0.pos._x, 3.0901699437494723)
  t.deepEqual(obs.sides[4].vertex0.pos._y, -9.510565162951536)
  t.deepEqual(obs.sides[4].vertex1.pos._x, 10)
  t.deepEqual(obs.sides[4].vertex1.pos._y, -2.4492935982947065e-15)
})

test('polygon (direct params)', t => {
  const obs = polygon([ [0, 0], [3, 0], [3, 3] ])

  const expSides = [ [ [ 3, 3 ], [ 0, 0 ] ],
    [ [ 0, 0 ], [ 3, 0 ] ],
    [ [ 3, 0 ], [ 3, 3 ] ]
  ]
  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 3)
  const gla = obs.sides.map(function (side) {
    return [[side.vertex0.pos._x, side.vertex0.pos._y], [side.vertex1.pos._x, side.vertex1.pos._y]]
  })
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('polygon (object params)', t => {
  const obs = polygon({points: [ [0, 0], [3, 0], [3, 3] ]})

  const expSides = [ [ [ 3, 3 ], [ 0, 0 ] ],
    [ [ 0, 0 ], [ 3, 0 ] ],
    [ [ 3, 0 ], [ 3, 3 ] ]
  ]
  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 3)
  const gla = obs.sides.map(function (side) {
    return [[side.vertex0.pos._x, side.vertex0.pos._y], [side.vertex1.pos._x, side.vertex1.pos._y]]
  })
  t.truthy(comparePositonVertices(obs.sides, expSides))
})

test('polygon (object params, with custom paths)', t => {
  const obs = polygon({points: [ [0, 0], [3, 0], [3, 3] ], paths: [ [0, 1, 2], [1, 2, 3] ]})

  const expSides = [ [ [ 3, 3 ], [ 0, 0 ] ],
    [ [ 0, 0 ], [ 3, 0 ] ],
    [ [ 3, 0 ], [ 3, 3 ] ]
  ]
  // we just use a sample of points for simplicity
  t.deepEqual(obs.sides.length, 3)
  t.truthy(comparePositonVertices(obs.sides, expSides))
})
