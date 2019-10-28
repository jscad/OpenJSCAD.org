const test = require('ava')

const {reverse, fromPoints} = require('./index')

test('reverse: Reverses a populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const expected = {sides: [
                      [new Float32Array([0, 1]), new Float32Array([1, 0])],
                      [new Float32Array([1, 0]), new Float32Array([0, 0])],
                      [new Float32Array([0, 0]), new Float32Array([0, 1])]
                    ],
                    transforms: new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]) }
  const geometry = fromPoints(points)
  const another = reverse(geometry)
  t.not(geometry, another)
  t.deepEqual(another, expected)
})
