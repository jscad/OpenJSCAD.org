const test = require('ava')

const {fromPoints} = require('./index')

test('fromPoints: creates populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {sides: [
                      [new Float32Array([0, 1]), new Float32Array([0, 0])],
                      [new Float32Array([0, 0]), new Float32Array([1, 0])],
                      [new Float32Array([1, 0]), new Float32Array([0, 1])]
                    ],
                    transforms: new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]) }
  t.deepEqual(fromPoints(points), expected)
})

test('fromPoints: throws for improper points', (t) => {
  t.throws(() => fromPoints(), Error)
  t.throws(() => fromPoints(0, 0), Error)
  t.throws(() => fromPoints([]), Error)
  t.throws(() => fromPoints([[0, 0]]), Error)
})
