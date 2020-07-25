const test = require('ava')

const { toPoints, fromPoints, toString } = require('./index')

const { comparePolygonsAsPoints } = require('../../../test/helpers/')

test('toPoints: Creates an array of points from a populated geom3', (t) => {
  const points = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const geometry = fromPoints(points)

  toString(geometry)

  const expected = [[[0, 0, 0], [1, 0, 0], [1, 0, 1]]]
  const pointarray = toPoints(geometry)
  t.deepEqual(pointarray, expected)
  t.true(comparePolygonsAsPoints(pointarray, expected))

  toString(geometry)
})
