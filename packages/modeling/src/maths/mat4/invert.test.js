const test = require('ava')

const { TAU } = require('../constants')
const vec3 = require('../vec3/index')

const { create, invert, fromTranslation, fromXRotation } = require('./index')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: invert() translate ', (t) => {
  const matrix = fromTranslation(create(), [10, 10, 0])
  const matrixInv = invert(create(), matrix)

  const vec1 = [0, 0, 0]
  const vec2 = vec3.transform([0, 0, 0], vec1, matrix)
  t.true(compareVectors(vec2, [10, 10, 0]))

  const vec2back = vec3.transform([0, 0, 0], vec2, matrixInv)
  t.true(compareVectors(vec2back, vec1))
})

test('mat4: invert() rotate ', (t) => {
  const matrix = fromXRotation(create(), TAU / 4)
  const matrixInv = invert(create(), matrix)

  const vec1 = [10, 10, 10]
  const vec2 = vec3.transform([0, 0, 0], vec1, matrix)
  t.true(compareVectors(vec2, [10, -10, 10]))

  const vec2back = vec3.transform([0, 0, 0], vec2, matrixInv)
  t.true(compareVectors(vec2back, vec1))
})
