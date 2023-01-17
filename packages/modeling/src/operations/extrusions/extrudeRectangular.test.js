import test from 'ava'

import { TAU } from '../../maths/constants.js'

import { geom2, geom3 } from '../../geometries/index.js'

import { measureVolume } from '../../measurements/index.js'

import { arc, rectangle } from '../../primitives/index.js'

import { extrudeRectangular } from './index.js'

test('extrudeRectangular (defaults)', (t) => {
  const geometry1 = arc({ radius: 5, endAngle: TAU / 4, segments: 16 })
  const geometry2 = rectangle({ size: [5, 5] })

  let obs = extrudeRectangular({ }, geometry1)
  let pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureVolume(obs), 15.643446504023084)
  t.is(pts.length, 44)

  obs = extrudeRectangular({ }, geometry2)
  pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureVolume(obs), 40)
  t.is(pts.length, 32)
})

test('extrudeRectangular (chamfer)', (t) => {
  const geometry1 = arc({ radius: 5, endAngle: TAU / 4, segments: 16 })
  const geometry2 = rectangle({ size: [5, 5] })

  let obs = extrudeRectangular({ corners: 'chamfer' }, geometry1)
  let pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureVolume(obs), 15.627942731474823)
  t.is(pts.length, 60)

  obs = extrudeRectangular({ corners: 'chamfer' }, geometry2)
  pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureVolume(obs), 38)
  t.is(pts.length, 48)
})

test('extrudeRectangular (segments = 8, round)', (t) => {
  const geometry1 = arc({ radius: 5, endAngle: TAU / 4, segments: 16 })
  const geometry2 = rectangle({ size: [5, 5] })

  let obs = extrudeRectangular({ segments: 8, corners: 'round' }, geometry1)
  let pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureVolume(obs), 18.456369856221006)
  t.is(pts.length, 84)

  obs = extrudeRectangular({ segments: 8, corners: 'round' }, geometry2)
  pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureVolume(obs), 38.828427124746185)
  t.is(pts.length, 64)
})

test('extrudeRectangular (holes)', (t) => {
  const geometry2 = geom2.create([
    [[-15, 15], [-15, -15], [15, -15], [15, 15]],
    [[5, 5], [5, -5], [-5, -5], [-5, 5]]
  ])

  const obs = extrudeRectangular({ size: 2, height: 15, segments: 16, corners: 'round' }, geometry2)
  const pts = geom3.toPoints(obs)
  t.notThrows(() => geom3.validate(obs))
  t.is(measureVolume(obs), 9487.376095070491)
  t.is(pts.length, 192)
})
