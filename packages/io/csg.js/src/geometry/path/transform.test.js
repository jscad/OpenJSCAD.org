const { degToRad } = require('../../math/utils')
const fromPointArray = require('./fromPointArray')
const fromZRotation = require('../../math/mat4/fromZRotation')
const toPointArray = require('./toPointArray')
const test = require('ava')
const transform = require('./transform')
const vec3 = require('../../math/vec3')

const line = fromPointArray({}, [[0, 0, 0], [1, 0, 0]])

test('transform: An empty path produces an empty point array', t => {
  t.deepEqual(toPointArray({}, transform(fromZRotation(degToRad(90)), line)),
              [vec3.fromValues(0, 0, 0), vec3.fromValues(0, 1, 0)])
})
