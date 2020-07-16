const test = require('ava')

const { appendBezier, fromPoints, toPoints } = require('./index')

const { comparePoints } = require('../../../test/helpers/')

test('appendBezier: appending to an empty path produces an error', (t) => {
  const p1 = fromPoints({}, [])
  t.throws(() => appendBezier({ controlPoints: [[12, 12]] }, p1),
    { message: 'the given path must contain one or more points (as the starting point for the bezier curve)' })
})

test('appendBezier: appending to a path produces a new path', (t) => {
  const p1 = fromPoints({}, [[10, -20]])
  const obs1 = appendBezier({ controlPoints: [[10, -10], [25, -10], [25, -20]], segments: 16 }, p1)
  const pts = toPoints(obs1)
  const exp = [
    [10, -20],
    [10.410054926134793, -17.32967535436671],
    [11.524609505100285, -15.244627343392775],
    [13.170248437738149, -13.74485596707819],
    [15.709947106075743, -12.693187014174669],
    [18.469801915922933, -12.556012802926382],
    [20.665245172410074, -13.128305870265937],
    [22.5922740239998, -14.318842543198585],
    [23.857263873597326, -15.783225858248295],
    [24.69615704524313, -17.676945010515432],
    [25, -20]
  ]
  t.is(pts.length, 11)
  t.true(comparePoints(pts, exp))

  const obs2 = appendBezier({ controlPoints: [null, [25, -30], [40, -30], [40, -20]], segments: 16 }, obs1)
  const pts2 = toPoints(obs2)
  t.is(pts2.length, 23)
})
