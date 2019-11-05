const test = require('ava')

const { appendBezier, fromPoints, toPoints } = require('./index')

test('appendBezier: appending to an empty path produces an error', t => {
  let p1 = fromPoints({}, [])
  t.throws(() => appendBezier({ controlPoints: [[12, 12]] }, p1),
    'the given path must contain one or more points (as the starting point for the bezier curve)')
})

test('appendBezier: appending to a path produces a new path', t => {
  let p1 = fromPoints({}, [[10, -20]])
  let obs1 = appendBezier({ controlPoints: [[10, -10], [25, -10], [25, -20]], segments: 16 }, p1)
  let pts = toPoints(obs1)
  let exp = [
    new Float32Array([ 10, -20 ]),
    new Float32Array([ 10.410054206848145, -17.329673767089844 ]),
    new Float32Array([ 11.524609565734863, -15.244627952575684 ]),
    new Float32Array([ 13.170248985290527, -13.744856834411621 ]),
    new Float32Array([ 15.709946632385254, -12.69318675994873 ]),
    new Float32Array([ 18.46980094909668, -12.556013107299805 ]),
    new Float32Array([ 20.665245056152344, -13.128305435180664 ]),
    new Float32Array([ 22.592273712158203, -14.318841934204102 ]),
    new Float32Array([ 23.857263565063477, -15.783226013183594 ]),
    new Float32Array([ 24.696157455444336, -17.676944732666016 ]),
    new Float32Array([ 25, -20 ])
  ]
  t.is(pts.length, 11)
  t.deepEqual(pts, exp)

  let obs2 = appendBezier({ controlPoints: [null, [25, -30], [40, -30], [40, -20]], segments: 16 }, obs1)
  let pts2 = toPoints(obs2)
  t.is(pts2.length, 23)
})
