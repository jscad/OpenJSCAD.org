import test from 'ava'

import { geom2, geom3 } from '../../geometries/index.js'

import { measureArea, measureVolume } from '../../measurements/index.js'

import { square } from '../../primitives/square.js'

import { hullChain } from './index.js'

test('hullChain: hullChain single geometry', (t) => {
  const result = hullChain([ square({ size: 1 }) ])
  t.notThrows(() => geom2.validate(result))
  t.is(measureArea(result), 1)
  t.is(geom2.toPoints(result).length, 4)
})

test('hullChain (two, geom2)', (t) => {
  const geometry1 = geom2.create([[[6, 6], [3, 6], [3, 3], [6, 3]]])
  const geometry2 = geom2.create([[[-6, -6], [-9, -6], [-9, -9], [-6, -9]]])

  // same
  let obs = hullChain(geometry1, geometry1)
  let pts = geom2.toPoints(obs)

  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 9)
  t.is(pts.length, 4)

  // different
  obs = hullChain(geometry1, geometry2)
  pts = geom2.toPoints(obs)

  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 81)
  t.is(pts.length, 6)
})

test('hullChain (three, geom2)', (t) => {
  const geometry1 = geom2.create([[[6, 6], [3, 6], [3, 3], [6, 3]]])
  const geometry2 = geom2.create([[[-6, -6], [-9, -6], [-9, -9], [-6, -9]]])
  const geometry3 = geom2.create([[[-6, 6], [-3, 6], [-3, 9], [-6, 9]]])

  // open
  let obs = hullChain(geometry1, geometry2, geometry3)
  let pts = geom2.toPoints(obs)

  // the sides change based on the bestplane chosen in trees/Node.js
  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 126)
  t.is(pts.length, 10)

  // closed
  obs = hullChain(geometry1, geometry2, geometry3, geometry1)
  pts = geom2.toPoints(obs)

  // the sides change based on the bestplane chosen in trees/Node.js
  t.notThrows(() => geom2.validate(obs))
  t.is(measureArea(obs), 148.21875)
  t.is(pts.length, 10)
})

test('hullChain (three, geom3)', (t) => {
  const geometry1 = geom3.fromPoints(
    [[[-1, -1, -1], [-1, -1, 1], [-1, 1, 1], [-1, 1, -1]],
      [[1, -1, -1], [1, 1, -1], [1, 1, 1], [1, -1, 1]],
      [[-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1]],
      [[-1, 1, -1], [-1, 1, 1], [1, 1, 1], [1, 1, -1]],
      [[-1, -1, -1], [-1, 1, -1], [1, 1, -1], [1, -1, -1]],
      [[-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]]]
  )
  const geometry2 = geom3.fromPoints(
    [[[3.5, 3.5, 3.5], [3.5, 3.5, 6.5], [3.5, 6.5, 6.5], [3.5, 6.5, 3.5]],
      [[6.5, 3.5, 3.5], [6.5, 6.5, 3.5], [6.5, 6.5, 6.5], [6.5, 3.5, 6.5]],
      [[3.5, 3.5, 3.5], [6.5, 3.5, 3.5], [6.5, 3.5, 6.5], [3.5, 3.5, 6.5]],
      [[3.5, 6.5, 3.5], [3.5, 6.5, 6.5], [6.5, 6.5, 6.5], [6.5, 6.5, 3.5]],
      [[3.5, 3.5, 3.5], [3.5, 6.5, 3.5], [6.5, 6.5, 3.5], [6.5, 3.5, 3.5]],
      [[3.5, 3.5, 6.5], [6.5, 3.5, 6.5], [6.5, 6.5, 6.5], [3.5, 6.5, 6.5]]]
  )
  const geometry3 = geom3.fromPoints(
    [[[-4.5, 1.5, -4.5], [-4.5, 1.5, -1.5], [-4.5, 4.5, -1.5], [-4.5, 4.5, -4.5]],
      [[-1.5, 1.5, -4.5], [-1.5, 4.5, -4.5], [-1.5, 4.5, -1.5], [-1.5, 1.5, -1.5]],
      [[-4.5, 1.5, -4.5], [-1.5, 1.5, -4.5], [-1.5, 1.5, -1.5], [-4.5, 1.5, -1.5]],
      [[-4.5, 4.5, -4.5], [-4.5, 4.5, -1.5], [-1.5, 4.5, -1.5], [-1.5, 4.5, -4.5]],
      [[-4.5, 1.5, -4.5], [-4.5, 4.5, -4.5], [-1.5, 4.5, -4.5], [-1.5, 1.5, -4.5]],
      [[-4.5, 1.5, -1.5], [-1.5, 1.5, -1.5], [-1.5, 4.5, -1.5], [-4.5, 4.5, -1.5]]]
  )

  // open
  let obs = hullChain(geometry1, geometry2, geometry3)
  let pts = geom3.toPoints(obs)

  t.notThrows.skip(() => geom3.validate(obs))
  t.is(measureArea(obs), 266.1454764345133)
  t.is(measureVolume(obs), 239.2012987012987)
  t.is(pts.length, 23)

  // closed
  obs = hullChain(geometry1, geometry2, geometry3, geometry1)
  pts = geom3.toPoints(obs)

  t.notThrows.skip(() => geom3.validate(obs))
  t.is(measureArea(obs), 272.2887171436021)
  t.is(measureVolume(obs), 261.96982218883045)
  t.is(pts.length, 28)
})
