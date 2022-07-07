const test = require('ava')

const { appendPoints, fromPoints, toPoints } = require('./index')

test('appendPoints: appending to an empty path produces a new path with expected points', (t) => {
  const p1 = fromPoints({}, [])
  const obs = appendPoints([[1, 1]], p1)
  const pts = toPoints(obs)
  t.not(p1, obs)
  t.is(pts.length, 1)
})

test('appendPoints: appending to a path produces a new path with expected points', (t) => {
  const p1 = fromPoints({}, [[1, 1], [2, 2]])
  const obs = appendPoints([[3, 3], [4, 4]], p1)
  const pts = toPoints(obs)
  t.not(p1, obs)
  t.is(pts.length, 4)
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
  const obs = appendPoints([[2, 2], [3, 3]], p1)
  const pts = toPoints(obs)
  t.not(p1, obs)
  t.is(pts.length, 3)
})
