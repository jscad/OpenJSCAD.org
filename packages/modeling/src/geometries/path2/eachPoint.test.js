const test = require('ava')

const vec2 = require('../../maths/vec2')

const { eachPoint, fromPoints } = require('./index')

test('eachPoint: Each point is emitted', (t) => {
  const collector = []
  eachPoint({}, (point) => collector.push(point), fromPoints({}, [[1, 1], [2, 2]]))
  t.deepEqual(collector, [vec2.fromValues(1, 1), vec2.fromValues(2, 2)])
})
