import test from 'ava'

import { TAU } from '../../maths/constants.js'
import * as vec2 from '../../maths/vec2/index.js'

import { appendArc, fromPoints, toPoints } from './index.js'

import { comparePoints } from '../../../test/helpers/index.js'

test('appendArc: appending to an empty path produces an error', (t) => {
  const p1 = fromPoints({}, [])
  t.throws(() => appendArc({ endpoint: [12, 12] }, p1),
    { message: 'the given path must contain one or more points (as the starting point for the arc)' })
})

test('appendArc: appending to a path produces a new path', (t) => {
  const p1 = fromPoints({}, [[1, 1], [2, 2]])
  let obs = appendArc({ endpoint: [-2, 2] }, p1)
  let pts = toPoints(obs)
  t.is(pts.length, 3)

  // test radius
  const p2 = fromPoints({}, [[27, -22], [27, -3]])
  obs = appendArc({ endpoint: [12, -22], radius: [15, -20] }, p2)
  pts = toPoints(obs)
  t.is(pts.length, 5)

  // test segments
  obs = appendArc({ endpoint: [12, -22], radius: [15, -20], segments: 64 }, p2)
  pts = toPoints(obs)
  t.is(pts.length, 17)

  // test clockwise
  obs = appendArc({ endpoint: [12, -22], radius: [15, -20], clockwise: true }, p2)
  pts = toPoints(obs)
  let exp = [
    [27, -22],
    [27, -3],
    [24.7485593841743, -12.579008396887021],
    [19.29019838402471, -19.492932330409836],
    [12, -22]
  ]
  t.is(pts.length, 5)
  t.true(comparePoints(pts, exp))

  // test large
  obs = appendArc({ endpoint: [12, -22], radius: [15, -20], large: true }, p2)
  pts = toPoints(obs)
  t.is(pts.length, 14)

  // test xaxisRotation
  obs = appendArc({ endpoint: [12, -22], radius: [15, -20], xaxisRotation: TAU / 4 }, p2)
  pts = toPoints(obs)
  exp = [
    [27, -22],
    [27, -3],
    [19.486852090983938, -5.488140907400943],
    [13.940501387124588, -10.031143708098092],
    [11.296247566821858, -15.862906638006239],
    [12, -22]
  ]
  t.is(pts.length, 6)
  t.true(comparePoints(pts, exp))

  // test small arc between far points
  obs = appendArc({ endpoint: [120, -220], radius: [5, -5] }, p2)
  pts = toPoints(obs)
  t.is(pts.length, 2)
})

test('appendArc: appending to a path produces exact endpoint', (t) => {
  let p1 = fromPoints({}, [[18, 1.8], [1, 3]])
  const endpoint = vec2.fromValues(1, -3)

  p1 = appendArc({
    endpoint,
    radius: [4, 4],
    segments: 36,
    large: true
  }, p1)

  const pts = toPoints(p1)

  t.deepEqual(pts[pts.length - 1], endpoint)
})
