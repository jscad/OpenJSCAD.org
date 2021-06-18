const test = require('ava')

const createTransform = require('../src/createTransform')

const Matrix4 = require('./helpers/Matrix4')

const compareMat4ToMatrix4 = (mat4, matrix4) => {
  // console.log('compareMat4ToMatrix4',mat4,matrix4.toString())
  const EPS = 0.0000000000001

  if (Math.abs(mat4[0] - matrix4[0]) > EPS) return false
  if (Math.abs(mat4[1] - matrix4[1]) > EPS) return false
  if (Math.abs(mat4[2] - matrix4[2]) > EPS) return false
  if (Math.abs(mat4[3] - matrix4[3]) > EPS) return false

  if (Math.abs(mat4[4] - matrix4[4]) > EPS) return false
  if (Math.abs(mat4[5] - matrix4[5]) > EPS) return false
  if (Math.abs(mat4[6] - matrix4[6]) > EPS) return false
  if (Math.abs(mat4[7] - matrix4[7]) > EPS) return false

  if (Math.abs(mat4[8] - matrix4[8]) > EPS) return false
  if (Math.abs(mat4[9] - matrix4[9]) > EPS) return false
  if (Math.abs(mat4[10] - matrix4[10]) > EPS) return false
  if (Math.abs(mat4[11] - matrix4[11]) > EPS) return false

  if (Math.abs(mat4[12] - matrix4[12]) > EPS) return false
  if (Math.abs(mat4[13] - matrix4[13]) > EPS) return false
  if (Math.abs(mat4[14] - matrix4[14]) > EPS) return false
  if (Math.abs(mat4[15] - matrix4[15]) > EPS) return false
  return true
}

test('createTransform returns expected transform matrix', (t) => {
  const matrix4 = new Matrix4()
  // X3D defaults
  let center = [0, 0, 0]
  let rotation = [0, 0, 1, 0]
  let scale = [1, 1, 1]
  const scaleOrientation = [0, 0, 1, 0]
  let translation = [0, 0, 0]

  let obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  let exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))

  center = [5, 5, 5]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  center = [0, 0, 0]

  scale = [5, 5, 5]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  scale = [1, 1, 1]

  translation = [5, 5, 5]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  translation = [0, 0, 0]

  rotation = [1, 0, 0, -0.707]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  rotation = [0, 0, 1, 0]

  rotation = [0.577, 0.577, 0.577, 1]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  rotation = [0, 0, 1, 0]

  rotation = [0, 0, -1, 0.523599]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  rotation = [0, 0, 1, 0]

  rotation = [1, 0, 0, 5.27]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  rotation = [0, 0, 1, 0]

  rotation = [0.0, 0.707, 0.707, 0.9]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  rotation = [0, 0, 1, 0]

  rotation = [0.0, 0.0, 0.0, 1.57]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  rotation = [0, 0, 1, 0]

  // COMBINATIONS
  scale = [0.91, 0.6, 0.3]
  translation = [0.8, -0.65, 0.5]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  scale = [1, 1, 1]
  translation = [0, 0, 0]

  rotation = [0.0, 0.0, -1.0, 0.523599]
  translation = [-0.25, 0.75, 0.0]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  rotation = [0, 0, 1, 0]
  translation = [0, 0, 0]

  center = [-0.00303999, 0.898843, -0.091817]
  rotation = [0, 1, 0, 1.57079]
  translation = [0.00303999, -0.898843, 0.049247]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = matrix4.set(translation, rotation, scale, scaleOrientation, center)
  t.true(compareMat4ToMatrix4(obs, exp))
  center = [0, 0, 0]
  rotation = [0, 0, 1, 0]
  translation = [0, 0, 0]
})
