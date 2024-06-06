import test from 'ava'

import { comparePoints } from '../../../test/helpers/index.js'

import { geom2 } from '../../geometries/index.js'

import { measureArea } from '../../measurements/index.js'

import { circle, rectangle, square } from '../../primitives/index.js'

import { center, translate } from '../transforms/index.js'

import { union } from './index.js'

test('union of one or more geom2 objects produces expected geometry', (t) => {
  const geometry1 = circle({ radius: 2, segments: 8 })

  // union of one object
  const result1 = union(geometry1)
  let obs = geom2.toPoints(result1)
  let exp = [
    [2, 0],
    [1.4142135623730951, 1.414213562373095],
    [0, 2],
    [-1.414213562373095, 1.4142135623730951],
    [-2, 0],
    [-1.4142135623730954, -1.414213562373095],
    [0, -2],
    [1.4142135623730947, -1.4142135623730954]
  ]
  t.notThrows(() => geom2.validate(result1))
  t.is(measureArea(result1), 11.31370849898476)
  t.is(obs.length, 8)
  t.true(comparePoints(obs, exp))

  // union of two non-overlapping objects
  const geometry2 = center({ relativeTo: [10, 10, 0] }, rectangle({ size: [4, 4] }))

  const result2 = union(geometry1, geometry2)
  obs = geom2.toPoints(result2)
  exp = [
    [2, 0],
    [1.4142135623730951, 1.414213562373095],
    [0, 2],
    [-1.414213562373095, 1.4142135623730951],
    [-2, 0],
    [-1.4142135623730954, -1.414213562373095],
    [0, -2],
    [1.4142135623730947, -1.4142135623730954],
    [8, 8],
    [12, 8],
    [12, 12],
    [8, 12]
  ]
  t.notThrows(() => geom2.validate(result2))
  t.is(measureArea(result2), 27.31370849898476)
  t.is(obs.length, 12)
  t.true(comparePoints(obs, exp))

  // union of two partially overlapping objects
  const geometry3 = rectangle({ size: [18, 18] })

  const result3 = union(geometry2, geometry3)
  obs = geom2.toPoints(result3)
  exp = [
    [-9, -9],
    [9, -9],
    [9, 8],
    [12, 8],
    [12, 12],
    [8, 12],
    [8, 9],
    [-9, 9]
  ]
  t.notThrows(() => geom2.validate(result3))
  t.is(measureArea(result3), 339)
  t.is(obs.length, 8)
  t.true(comparePoints(obs, exp))

  // union of two completely overlapping objects
  const result4 = union(geometry1, geometry3)
  obs = geom2.toPoints(result4)
  exp = [
    [-9, -9],
    [9, -9],
    [9, 9],
    [-9, 9]
  ]
  t.notThrows(() => geom2.validate(result4))
  t.is(measureArea(result4), 324)
  t.is(obs.length, 4)
  t.true(comparePoints(obs, exp))

  // union of unions of non-overlapping objects (BSP gap from #907)
  const circ = circle({ radius: 1, segments: 32 })
  const result5 = union(
    union(
      translate([17, 21], circ),
      translate([7, 0], circ)
    ),
    union(
      translate([3, 21], circ),
      translate([17, 21], circ)
    )
  )
  obs = geom2.toPoints(result5)
  t.notThrows(() => geom2.validate(result5))
  t.is(measureArea(result5), 9.36433545677411)
  t.is(obs.length, 96)
})

test('union of geom2 with closing issues #15', (t) => {
  const c = geom2.create([
    [
      [-49.303317158650124, -14.680936297108701],
      [-49.454288844276434, -14.655657696589124],
      [-49.57891661679625, -14.744536129416353],
      [-49.60419521731582, -14.895507815042663],
      [-49.42407001323205, -15.676050889493034],
      [-49.30706235399221, -15.815296746000918],
      [-46.00505780290427, -17.211085479998047],
      [-45.859397037232526, -17.21502856394237],
      [-45.74972032664388, -17.119093034957913],
      [-45.73424573227583, -16.974202926612953],
      [-45.82118740347841, -16.8572681055562]
    ],
    [
      [-48.16645938811709, -15.863171735891832],
      [-49.057272912186846, -15.486616385421712],
      [-49.10586702080816, -15.276041773521108]
    ]
  ])
  const d = geom2.create([
    [
      [-49.214438725822895, -14.805564069628517],
      [-49.3022746684112, -14.681592326491142],
      [-68.09792828135777, -2.7727075661152867],
      [-68.24753735887461, -2.7462335017957002],
      [-68.37258141465594, -2.8325337698763633],
      [-68.40089829889257, -2.9818050203707855],
      [-68.31614651314507, -3.1079037395143487],
      [-49.340367696114726, -15.797331574340568],
      [-49.18823337756091, -15.826840121949317],
      [-49.060690072123904, -15.738815633867802],
      [-49.03431352173912, -15.586107144078888]
    ],
    [
      [-49.53755741140094, -15.184271834314728],
      [-54.61235529924313, -11.790667693213138],
      [-49.58572929483431, -14.975526866122138]
    ]
  ])

  const result = union(c, d)
  const pts = geom2.toPoints(result)
  const exp = [
    [-68.40089829889257, -2.9818050203707855],
    [-68.31614651314507, -3.1079037395143487],
    [-49.340367696114726, -15.797331574340568],
    [-49.318612612739564, -15.801551272562577],
    [-49.30706235399221, -15.815296746000918],
    [-46.00505780290427, -17.211085479998047],
    [-45.859397037232526, -17.21502856394237],
    [-45.74972032664388, -17.119093034957913],
    [-45.73424573227583, -16.974202926612953],
    [-45.82118740347841, -16.8572681055562],
    [-49.302794903461326, -14.68126270670841],
    [-68.09792828135777, -2.7727075661152867],
    [-68.24753735887461, -2.7462335017957002],
    [-68.37258141465594, -2.8325337698763633],
    [-49.58572929483431, -14.975526866122138],
    [-49.53755741140094, -15.184271834314728],
    [-54.61235529924313, -11.790667693213138],
    [-48.16645938811709, -15.863171735891832],
    [-49.057272912186846, -15.486616385421712],
    [-49.10586702080816, -15.276041773521108]
  ]
  t.notThrows(() => geom2.validate(result))
  t.is(measureArea(result), 17.56120670215806)
  t.is(pts.length, 20) // number of sides in union
  t.true(comparePoints(pts, exp))
})

test('union of geom2 with colinear edge (martinez issue #155)', (t) => {
  // This test is a minimal example extracted from:
  // project({ axis: [0, 1, 0], origin: [0, -1, 0] }, torus({ innerSegments: 8, outerSegments: 4 }))
  const g1 = geom2.create([[
    [-5, 0],
    [4.707106781186547, 0.7071067811865477],
    [3.477592250072517, 0.7836116248912244],
    [4, 1]
  ]])
  const g2 = geom2.create([[
    [4.707106781186547, 0.7071067811865477],
    [4, 1],
    [0, 1]
  ]])
  const exp = [
    [-5, 0],
    [4.707106781186547, 0.7071067811865477],
    [4, 1],
    [0, 1],
    [2.564081902288895, 0.8404535446987661]
  ]
  const result = union(g1, g2)
  const pts = geom2.toPoints(result)
  t.notThrows(() => geom2.validate(result))
  t.is(measureArea(result), 1.9906657858562764)
  t.is(pts.length, 5)
  t.true(comparePoints(pts, exp))
})

test('union with undefined/null values', (t) => {
  const square1 = square({ size: 8 })
  const square2 = square({ size: 6 })
  const square3 = square({ size: 4 })
  const geometries = [square1, undefined, square2, null, square3]

  const obs = union(...geometries)
  const pts = geom2.toPoints(obs)
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 4)
})

test('union of nested arrays', (t) => {
  const square1 = square({ size: 8 })
  const square2 = square({ size: 6 })
  const square3 = square({ size: 4 })
  const geometries = [square1, [square2, [square3]]]

  const obs = union(...geometries)
  const pts = geom2.toPoints(obs)
  t.notThrows(() => geom2.validate(obs))
  t.is(pts.length, 4)
})
