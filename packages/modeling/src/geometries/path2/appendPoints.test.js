import test from 'ava'

import { appendPoints, fromPoints, toPoints } from './index.js'

test('appendPoints: appending to an empty path produces a new path with expected points', (t) => {
  const p1 = fromPoints({}, [])
  const obs = appendPoints([[1, 1]], p1)
  const pts = toPoints(obs)
  t.not(p1, obs)
  t.is(pts.length, 1)
})

test('appendPoints: appending to a path produces a new path with expected points', (t) => {
  const p1 = fromPoints({}, [[1, 1], [2, 2]])
  let obs = appendPoints([[3, 3], [4, 4]], p1)
  let pts = toPoints(obs)
  t.not(p1, obs)
  t.is(pts.length, 4)

  const p2 = fromPoints({ closed: true }, [[0, 0], [1, 0], [0, 1]])
  obs = appendPoints([[0, -1], [0, -2]], p2)
  pts = toPoints(obs)
  t.not(p2, obs)
  t.is(pts.length, 6)
})

test('appendPoints: appending empty points to a path produces a new path with expected points', (t) => {
  const p1 = fromPoints({}, [[1, 1], [2, 2]])
  const obs = appendPoints([], p1)
  const pts = toPoints(obs)
  t.not(p1, obs)
  t.is(pts.length, 2)
})

test('appendPoints: appending same points to a path produces a new path with expected points', (t) => {
  const p1 = fromPoints({}, [[1, 1], [2, 2]])
  let obs = appendPoints([[2, 2], [3, 3]], p1)
  let pts = toPoints(obs)
  t.not(p1, obs)
  t.is(pts.length, 3)

  const p2 = fromPoints({ closed: true }, [[0, 0], [1, 0], [0, 1]])
  obs = appendPoints([[0, 0], [0, 0], [0, -1]], p2)
  pts = toPoints(obs)
  t.not(p2, obs)
  t.is(pts.length, 5)
})
