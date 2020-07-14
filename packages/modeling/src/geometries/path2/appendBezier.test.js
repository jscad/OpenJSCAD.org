const test = require('ava')

const { appendBezier, fromPoints, toPoints } = require('./index')

const { compareVectors } = require('../../../test/helpers/')

test('appendBezier: appending to an empty path produces an error', (t) => {
  const p1 = fromPoints({}, [])
  t.throws(() => appendBezier({ controlPoints: [[12, 12]] }, p1),
    {message: 'the given path must contain one or more points (as the starting point for the bezier curve)'})
})

test('appendBezier: appending to a path produces a new path', (t) => {
  const p1 = fromPoints({}, [[10, -20]])
  const obs1 = appendBezier({ controlPoints: [[10, -10], [25, -10], [25, -20]], segments: 16 }, p1)
  const pts = toPoints(obs1)
  const exp = [
    [10, -20],
    [10.410054206848145, -17.329673767089844],
    [11.524609565734863, -15.244627952575684],
    [13.170248985290527, -13.744856834411621],
    [15.709946632385254, -12.69318675994873],
    [18.46980094909668, -12.556013107299805],
    [20.665245056152344, -13.128305435180664],
    [22.592273712158203, -14.318841934204102],
    [23.857263565063477, -15.783226013183594],
    [24.696157455444336, -17.676944732666016],
    [25, -20]
  ]
  t.is(pts.length, 11)
  t.true(compareVectors(pts, exp))

  const obs2 = appendBezier({ controlPoints: [null, [25, -30], [40, -30], [40, -20]], segments: 16 }, obs1)
  const pts2 = toPoints(obs2)
  t.is(pts2.length, 23)
})
