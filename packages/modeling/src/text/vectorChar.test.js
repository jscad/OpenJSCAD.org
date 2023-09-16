import test from 'ava'

import { vec2 } from '../maths/index.js'

import { vectorChar } from './index.js'

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

test('vectorChar (char)', (t) => {
  const obs = vectorChar({}, 'H')
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
  const obs = vectorChar({ height: 10 }, 'h')
  const expSegments = [
    [[2.857142857142857, 15], [2.857142857142857, 0]],
    [[2.857142857142857, 7.142857142857143], [5, 9.285714285714286], [6.428571428571429, 10], [8.571428571428571, 10], [10, 9.285714285714286], [10.714285714285715, 7.142857142857143], [10.714285714285715, 0]]
  ]

  t.deepEqual(obs.width, 13.571428571428571)
  t.deepEqual(obs.height, 10)
  t.true(compareSegments(obs.paths, expSegments))
})

test('vectorChar required options', (t) => {
  t.throws(() => vectorChar(), { message: 'text must be a single character' })
  t.throws(() => vectorChar({}), { message: 'text must be a single character' })
  t.throws(() => vectorChar({}, ''), { message: 'text must be a single character' })
  t.throws(() => vectorChar({}, 'ABC'), { message: 'text must be a single character' })
})
