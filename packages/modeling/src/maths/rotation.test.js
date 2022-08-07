const test = require('ava')

const { compareVectors } = require('../../test/helpers/index')

const { constants, mat4, vec2, vec3 } = require('./index')

// ALL POSITIVE ROTATIONS ARE CLOCKWISE
// see https://webglfundamentals.org/webgl/lessons/webgl-3d-orthographic.html
// IN A LEFT-HANDED COORDINATE SYSTEM

// JSCAD IS RIGHT-HANDED COORDINATE SYSTEM
// WHERE POSITIVE ROTATIONS ARE COUNTER-CLOCKWISE

// identity matrices for comparisons

const rad90 = constants.TAU / 4

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
  const idn = mat4.create()
  let obs

  // test matrices for rotating about X axis
  obs = mat4.fromXRotation(mat4.create(), rad90)
  t.true(compareVectors(obs, cwX90Matrix))

  obs = mat4.fromRotation(mat4.create(), rad90, [1, 0, 0])
  t.true(compareVectors(obs, cwX90Matrix))

  obs = mat4.rotateX(obs, idn, rad90)
  t.true(compareVectors(obs, cwX90Matrix))

  // test matrices for rotating about Y axis
  obs = mat4.fromYRotation(mat4.create(), rad90)
  t.true(compareVectors(obs, cwY90Matrix))

  obs = mat4.fromRotation(mat4.create(), rad90, [0, 1, 0])
  t.true(compareVectors(obs, cwY90Matrix))

  obs = mat4.rotateY(obs, idn, rad90)
  t.true(compareVectors(obs, cwY90Matrix))

  // test matrices for rotating about Z axis
  obs = mat4.fromZRotation(mat4.create(), rad90)
  t.true(compareVectors(obs, cwZ90Matrix))

  obs = mat4.fromRotation(mat4.create(), rad90, [0, 0, 1])
  t.true(compareVectors(obs, cwZ90Matrix))

  obs = mat4.rotateZ(obs, idn, rad90)
  t.true(compareVectors(obs, cwZ90Matrix))
})

test('rotation: vec2 rotation functions should produce expected results', (t) => {
  const onX = vec2.fromValues(3, 0)
  const onY = vec2.fromValues(0, 3)
  const matZ = mat4.fromZRotation(mat4.create(), rad90)

  // transform
  const t1 = vec2.transform(vec2.create(), onX, matZ)
  t.true(compareVectors(t1, [0, 3]))

  const t2 = vec2.transform(vec2.create(), onY, matZ)
  t.true(compareVectors(t2, [-3, 0]))

  // rotate
  const r1 = vec2.rotate(vec2.create(), onX, vec2.create(), rad90)
  t.true(compareVectors(r1, [0, 3]))

  const r2 = vec2.rotate(vec2.create(), onY, vec2.create(), rad90)
  t.true(compareVectors(r2, [-3, 0]))

  // verify
  t.true(compareVectors(t1, r1))
  t.true(compareVectors(t2, r2))
})

test('rotation: vec3 rotation functions should produce expected results', (t) => {
  const onX = vec3.fromValues(3, 0, 0)
  const onY = vec3.fromValues(0, 3, 0)
  const onZ = vec3.fromValues(0, 0, 3)
  const matX = mat4.fromXRotation(mat4.create(), rad90)
  const matY = mat4.fromYRotation(mat4.create(), rad90)
  const matZ = mat4.fromZRotation(mat4.create(), rad90)

  // transform
  const t1 = vec3.transform(vec3.create(), onX, matZ)
  t.true(compareVectors(t1, [0, 3, 0]))

  const t2 = vec3.transform(vec3.create(), onY, matX)
  t.true(compareVectors(t2, [0, 0, 3]))

  const t3 = vec3.transform(vec3.create(), onZ, matY)
  t.true(compareVectors(t3, [3, 0, 0]))

  // rotate
  const r1 = vec3.rotateZ(vec3.create(), onX, [0, 0, 0], rad90)
  t.true(compareVectors(r1, [0, 3, 0]))

  const r2 = vec3.rotateX(vec3.create(), onY, [0, 0, 0], rad90)
  t.true(compareVectors(r2, [0, 0, 3]))

  const r3 = vec3.rotateY(vec3.create(), onZ, [0, 0, 0], rad90)
  t.true(compareVectors(r3, [3, 0, 0]))

  // verify
  t.true(compareVectors(t1, r1))
  t.true(compareVectors(t2, r2))
  t.true(compareVectors(t3, r3))
})
