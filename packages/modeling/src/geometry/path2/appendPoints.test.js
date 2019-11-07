const test = require('ava')

const { appendPoints, fromPoints, toPoints } = require('./index')

test('appendPoints: appending to an empty path produces a new path with expected points', t => {
  let p1 = fromPoints({}, [])
  let obs = appendPoints([[1, 1]], p1)
  let pts = toPoints(obs)
  t.not(p1, obs)
  t.is(pts.length, 1)
})

test('appendPoints: appending to a path produces a new path with expected points', t => {
  let p1 = fromPoints({}, [[1, 1], [2, 2]])
  let obs = appendPoints([[3, 3], [4, 4]], p1)
  let pts = toPoints(obs)
  t.not(p1, obs)
  t.is(pts.length, 4)
})
