const test = require('ava')

const { toPoints, create, fromPoints, toString } = require('./index')

const { comparePoints } = require('../../../test/helpers/')

test('toPoints: creates an empty array of points from a unpopulated geom2', (t) => {
  const geometry = create()
  const pointarray = toPoints(geometry)
  t.deepEqual(pointarray, [])
})

test('toPoints: creates an array of points from a populated geom2', (t) => {
  const points = [[0, 0], [1, 0], [0, 1]]
  const geometry = fromPoints(points)

  toString(geometry)

  const expected = [[0, 0], [1, 0], [0, 1]]
  const pointarray = toPoints(geometry)
  t.true(comparePoints(pointarray, expected))

  toString(geometry)
})
