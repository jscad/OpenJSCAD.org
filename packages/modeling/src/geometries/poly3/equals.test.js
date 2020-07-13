const test = require('ava')
const { equals, fromPoints } = require('./index')

test('equals: checks if two poly3 are equal', (t) => {
  const points = [[0, 0, 0], [1, 0, 0], [1, 0, 1]]
  return t.is(equals(fromPoints(points), fromPoints(points)), true)
})
