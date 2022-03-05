const test = require('ava')

const vec3 = require('../vec3')

const create = require('./create')
const fromVectorRotation = require('./fromVectorRotation')

const { compareVectors } = require('../../../test/helpers/index')

test('mat4: fromVectorRotation() called with out parameter should return a mat4 with correct values', (t) => {
  // unit vectors, same directions
  const out = create()
  let ret = fromVectorRotation(out, [1, 0, 0], [1, 0, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 1, 0], [0, 1, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 0, 1], [0, 0, 1])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  // unit vectors, axis rotations
  ret = fromVectorRotation(out, [1, 0, 0], [0, 1, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [1, 0, 0], [0, 0, 1])
  t.is(ret, out)
  t.true(compareVectors(out, [0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 1, 0], [1, 0, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 1, 0], [0, 0, 1])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 0, 1], [1, 0, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 0, 1], [0, 1, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [-1, 0, 0], [0, -1, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [-1, 0, 0], [0, 0, -1])
  t.is(ret, out)
  t.true(compareVectors(out, [0, 0, 1, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, -1, 0], [-1, 0, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, -1, 0], [0, 0, -1])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 0, -1], [-1, 0, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [0, 0, -1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 0, -1], [0, -1, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1]))

  // unit vector, opposite directions
  ret = fromVectorRotation(out, [1, 0, 0], [-1, 0, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [-1, 0, 0], [1, 0, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [-1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 1, 0], [0, -1, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, -1, 0], [0, 1, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 0, 1], [0, 0, -1])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 0, -1], [0, 0, 1])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))

  // different units
  ret = fromVectorRotation(out, [11, 0, 0], [0, 33, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 0.11, 0], [0, 0, 0.33])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1]))

  ret = fromVectorRotation(out, [0, 0, 111111.0], [0, 0.33, 0])
  t.is(ret, out)
  t.true(compareVectors(out, [1, 0, 0, 0, 0, 0, -1, 0, 0, 1, 0, 0, 0, 0, 0, 1]))

  // different quadrants
  ret = fromVectorRotation(out, [0.5, 0.5, 0.5], [-0.5, 0.5, 0.5])
  t.is(ret, out)
  t.true(compareVectors(out, [0.3333333333333334, 0.6666666666666669, 0.6666666666666669, 0, -0.6666666666666669, 0.666666666666667, -0.3333333333333335, 0, -0.6666666666666669, -0.3333333333333335, 0.666666666666667, 0, 0, 0, 0, 1]))
  t.true(compareVectors([-0.5, 0.5, 0.5], vec3.transform(vec3.create(), [0.5, 0.5, 0.5], ret)))

  ret = fromVectorRotation(out, [5, 5, 5], [5, 5, -5])
  t.is(ret, out)
  t.true(compareVectors(out, [0.6666666666666666, -0.3333333333333333, -0.6666666666666666, 0, -0.3333333333333333, 0.6666666666666666, -0.6666666666666666, 0, 0.6666666666666666, 0.6666666666666666, 0.3333333333333333, 0, 0, 0, 0, 1]))
  t.true(compareVectors([5, 5, -5], vec3.transform(vec3.create(), [5, 5, 5], ret)))

  ret = fromVectorRotation(out, [5, 5, 5], [-5, -5, -5])
  t.is(ret, out)
  t.true(compareVectors(out, [0, -1, 0, 0, -1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1]))
  t.true(compareVectors([-5, -5, -5], vec3.transform(vec3.create(), [5, 5, 5], ret)))
})
