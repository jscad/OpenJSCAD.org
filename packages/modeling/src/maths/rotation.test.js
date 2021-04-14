const test = require('ava')

const { compareVectors } = require('../../test/helpers/index')

const { mat4, vec2, vec3 } = require('./index')

// ALL POSITIVE ROTATIONS ARE CLOCKWISE
// see https://webglfundamentals.org/webgl/lessons/webgl-3d-orthographic.html
// IN A LEFT-HANDED COORDINATE SYSTEM

// identity matrices for comparisons

const rad90 = Math.PI / 2

// +90 degree rotation about X
const cwX90Matrix = [
  1, 0, 0, 0,
  0, Math.cos(rad90), Math.sin(rad90), 0,
  0, -Math.sin(rad90), Math.cos(rad90), 0,
  0, 0, 0, 1
]
// +90 degree rotation about Y
const cwY90Matrix = [
  Math.cos(rad90), 0, -Math.sin(rad90), 0,
  0, 1, 0, 0,
  Math.sin(rad90), 0, Math.cos(rad90), 0,
  0, 0, 0, 1
]
// +90 degree rotation about Z
const cwZ90Matrix = [
  Math.cos(rad90), Math.sin(rad90), 0, 0,
  -Math.sin(rad90), Math.cos(rad90), 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]

test('rotation: mat4 rotation functions should produce expected results', (t) => {
  const idn = mat4.identity()
  let obs

  // test matrices for rotating about X axis
  obs = mat4.fromXRotation(rad90)
  t.true(compareVectors(obs, cwX90Matrix))

  obs = mat4.fromRotation(rad90, [1, 0, 0])
  t.true(compareVectors(obs, cwX90Matrix))

  obs = mat4.rotateX(rad90, idn)
  t.true(compareVectors(obs, cwX90Matrix))

  // test matrices for rotating about Y axis
  obs = mat4.fromYRotation(rad90)
  t.true(compareVectors(obs, cwY90Matrix))

  obs = mat4.fromRotation(rad90, [0, 1, 0])
  t.true(compareVectors(obs, cwY90Matrix))

  obs = mat4.rotateY(rad90, idn)
  t.true(compareVectors(obs, cwY90Matrix))

  // test matrices for rotating about Z axis
  obs = mat4.fromZRotation(rad90)
  t.true(compareVectors(obs, cwZ90Matrix))

  obs = mat4.fromRotation(rad90, [0, 0, 1])
  t.true(compareVectors(obs, cwZ90Matrix))

  obs = mat4.rotateZ(rad90, idn)
  t.true(compareVectors(obs, cwZ90Matrix))
})

test('rotation: vec2 rotation functions should produce expected results', (t) => {
  const onX = vec2.fromValues(3, 0)
  const onY = vec2.fromValues(0, 3)
  const matZ = mat4.fromZRotation(rad90)

  // transform
  const t1 = vec2.transform(matZ, onX)
  t.true(compareVectors(t1, [0, 3]))

  const t2 = vec2.transform(matZ, onY)
  t.true(compareVectors(t2, [-3, 0]))

  // rotate
  const r1 = vec2.rotate(rad90, onX)
  t.true(compareVectors(r1, [0, 3]))

  const r2 = vec2.rotate(rad90, onY)
  t.true(compareVectors(r2, [-3, 0]))

  // verify
  t.true(compareVectors(t1, r1))
  t.true(compareVectors(t2, r2))
})

test('rotation: vec3 rotation functions should produce expected results', (t) => {
  const onX = vec3.fromValues(3, 0, 0)
  const onY = vec3.fromValues(0, 3, 0)
  const onZ = vec3.fromValues(0, 0, 3)
  const matX = mat4.fromXRotation(rad90)
  const matY = mat4.fromYRotation(rad90)
  const matZ = mat4.fromZRotation(rad90)

  // transform
  const t1 = vec3.transform(matZ, onX)
  t.true(compareVectors(t1, [0, 3, 0]))

  const t2 = vec3.transform(matX, onY)
  t.true(compareVectors(t2, [0, 0, 3]))

  const t3 = vec3.transform(matY, onZ)
  t.true(compareVectors(t3, [3, 0, 0]))

  // rotate
  const r1 = vec3.rotateZ(rad90, [0, 0, 0], onX)
  t.true(compareVectors(r1, [0, 3, 0]))

  const r2 = vec3.rotateX(rad90, [0, 0, 0], onY)
  t.true(compareVectors(r2, [0, 0, 3]))

  const r3 = vec3.rotateY(rad90, [0, 0, 0], onZ)
  t.true(compareVectors(r3, [3, 0, 0]))

  // verify
  t.true(compareVectors(t1, r1))
  t.true(compareVectors(t2, r2))
  t.true(compareVectors(t3, r3))
})
