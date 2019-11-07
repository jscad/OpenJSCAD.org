const test = require('ava')

const { appendArc, fromPoints, toPoints } = require('./index')

test('appendArc: appending to an empty path produces an error', t => {
  let p1 = fromPoints({}, [])
  t.throws(() => appendArc({ endpoint: [12, 12] }, p1),
    'the given path must contain one or more points (as the starting point for the arc)')
})

test('appendArc: appending to a path produces a new path', t => {
  let p1 = fromPoints({}, [[1, 1], [2, 2]])
  let obs = appendArc({ endpoint: [-2, 2] }, p1)
  let pts = toPoints(obs)
  t.is(pts.length, 3)

  // test radius
  let p2 = fromPoints({}, [[27, -22], [27, -3]])
  obs = appendArc({ endpoint: [12, -22], radius: [15, -20] }, p2)
  pts = toPoints(obs)
  t.is(pts.length, 7)

  // test segments
  obs = appendArc({ endpoint: [12, -22], radius: [15, -20], segments: 64 }, p2)
  pts = toPoints(obs)
  t.is(pts.length, 19)

  // test clockwise
  obs = appendArc({ endpoint: [12, -22], radius: [15, -20], clockwise: true }, p2)
  pts = toPoints(obs)
  let exp = [
    new Float32Array([ 27, -22 ]),
    new Float32Array([ 27, -3 ]),
    new Float32Array([ 26.08645248413086, -8.941047668457031 ]),
    new Float32Array([ 23.87938690185547, -14.243871688842773 ]),
    new Float32Array([ 20.581748962402344, -18.420881271362305 ]),
    new Float32Array([ 16.496747970581055, -21.08800506591797 ]),
    new Float32Array([ 12, -22 ])
  ]
  t.is(pts.length, 7)
  t.deepEqual(pts, exp)

  // test large
  obs = appendArc({ endpoint: [12, -22], radius: [15, -20], large: true }, p2)
  pts = toPoints(obs)
  t.is(pts.length, 16)

  // test xaxisrotation
  obs = appendArc({ endpoint: [12, -22], radius: [15, -20], xaxisrotation: Math.PI / 2 }, p2)
  pts = toPoints(obs)
  exp = [
    new Float32Array([ 27, -22 ]),
    new Float32Array([ 27, -3 ]),
    new Float32Array([ 21.830322265625, -4.401627540588379 ]),
    new Float32Array([ 17.364704132080078, -6.805886268615723 ]),
    new Float32Array([ 13.940502166748047, -10.031143188476562 ]),
    new Float32Array([ 11.816394805908203, -13.833745002746582 ]),
    new Float32Array([ 11.152851104736328, -17.926424026489258 ]),
    new Float32Array([ 12, -22 ])
  ]
  t.is(pts.length, 8)
  t.deepEqual(pts, exp)

  // test small arc between far points
  obs = appendArc({ endpoint: [120, -220], radius: [5, -5] }, p2)
  pts = toPoints(obs)
  t.is(pts.length, 2)
})
