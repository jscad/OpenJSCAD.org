const test = require('ava')

const vec2 = require('../../math/vec2')

const {toPoints, fromPoints} = require('./index')

test('toPoints: An empty path produces an empty point array', t => {
  t.deepEqual(toPoints(fromPoints({}, [])), [])
})

test('toPoints: An non-empty open path produces a matching point array', t => {
  t.deepEqual(toPoints(fromPoints({}, [[1, 1, 0]])), [vec2.fromValues(1, 1)])
})

test('toPoints: An non-empty closed path produces a matching point array', t => {
  t.deepEqual(toPoints(fromPoints({}, [[1, 1, 0]])), [vec2.fromValues(1, 1)])
})
