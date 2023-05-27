import test from 'ava'

import { vec2 } from '../maths/index.js'
import { path2 } from '../geometries/index.js'

import { vectorChar } from './index.js'

const questionMarkSegments = [ // '?'
  [[3, 16], [3, 17], [4, 19], [5, 20], [7, 21], [11, 21], [13, 20], [14, 19], [15, 17], [15, 15], [14, 13], [13, 12], [9, 10], [9, 7]],
  [[9, 2], [8, 1], [9, 0], [10, 1]]
]

const compareSegments = (paths, segments) => {
  if (paths.length !== segments.length) return false
  for (let i = 0; i < paths.length; i++) {
    const ppoints = paths[i].points
    const spoints = segments[i]
    if (ppoints.length !== spoints.length) return false
    for (let i = 0; i < ppoints.length; i++) {
      if (!vec2.equals(ppoints[i], spoints[i])) return false
    }
  }
  return true
}

test('vectorChar (defaults)', (t) => {
  const obs = vectorChar()

  t.deepEqual(obs.width, 18)
  t.deepEqual(obs.height, 14)
  t.true(compareSegments(obs.paths, questionMarkSegments))
})

test('vectorChar (char)', (t) => {
  const obs = vectorChar('H')
  const expSegments = [
    [[4, 21], [4, 0]],
    [[18, 21], [18, 0]],
    [[4, 11], [18, 11]]
  ]

  t.deepEqual(obs.width, 22)
  t.deepEqual(obs.height, 14)
  t.true(compareSegments(obs.paths, expSegments))
})

test('vectorChar ({ xOffset, yOffset }, char)', (t) => {
  const obs = vectorChar({ xOffset: 10, yOffset: 20 }, 'H')
  const expSegments = [
    [[14, 41], [14, 20]],
    [[28, 41], [28, 20]],
    [[14, 31], [28, 31]]
  ]

  t.deepEqual(obs.width, 22)
  t.deepEqual(obs.height, 14)
  t.true(compareSegments(obs.paths, expSegments))
})

test('vectorChar ({ height }, char)', (t) => {
  const obs = vectorChar({ height: 10, input: 'h' })
  const expSegments = [
    [[2.857142857142857, 15], [2.857142857142857, 0]],
    [[2.857142857142857, 7.142857142857143], [5, 9.285714285714286], [6.428571428571429, 10], [8.571428571428571, 10], [10, 9.285714285714286], [10.714285714285715, 7.142857142857143], [10.714285714285715, 0]]
  ]

  t.deepEqual(obs.width, 13.571428571428571)
  t.deepEqual(obs.height, 10)
  t.true(compareSegments(obs.paths, expSegments))
})

