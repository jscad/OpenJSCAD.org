const test = require('ava')

const createTransform = require('../src/createTransform')

test('createTransform returns expected transform matrix', (t) => {
  // X3D defaults
  let center = [0, 0, 0]
  let rotation = [0, 0, 1, 0]
  let scale = [1, 1, 1]
  const scaleOrientation = [0, 0, 1, 0]
  let translation = [0, 0, 0]

  let obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  let exp = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  t.deepEqual(obs, exp)

  center = [5, 5, 5]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  t.deepEqual(obs, exp)
  center = [0, 0, 0]

  scale = [5, 5, 5]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 5, 0, 0, 0, 0, 1]
  t.deepEqual(obs, exp)
  scale = [1, 1, 1]

  translation = [5, 5, 5]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 5, 5, 5, 1]
  t.deepEqual(obs, exp)
  translation = [0, 0, 0]

  rotation = [1, 0, 0, -0.707]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [
    1, 0, 0, 0,
    0, 0.7603139617444397, -0.6495557555564224, 0,
    0, 0.6495557555564224, 0.7603139617444397, 0,
    0, 0, 0, 1
  ]
  t.deepEqual(obs, exp)
  rotation = [0, 0, 1, 0]

  rotation = [0.577, 0.577, 0.577, 1]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [
    0.6935348705787598, 0.6390560643047187, -0.33259093488347846, 0,
    -0.33259093488347846, 0.6935348705787598, 0.6390560643047187, 0,
    0.6390560643047187, -0.33259093488347846, 0.6935348705787598, 0,
    0, 0, 0, 1
  ]
  t.deepEqual(obs, exp)
  rotation = [0, 0, 1, 0]

  rotation = [0, 0, -1, 0.523599]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [
    0.8660252915835662, -0.5000001943375613, 0, 0,
    0.5000001943375613, 0.8660252915835662, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]
  t.deepEqual(obs, exp)
  rotation = [0, 0, 1, 0]

  rotation = [1, 0, 0, 5.27]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [
    1, 0, 0, 0,
    0, 0.5291606082056949, -0.8485216854762045, 0,
    0, 0.8485216854762045, 0.5291606082056949, 0,
    0, 0, 0, 1
  ]
  t.deepEqual(obs, exp)
  rotation = [0, 0, 1, 0]

  rotation = [0.0, 0.707, 0.707, 0.9]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [
    0.6216099682706644, 0.5538957696834953, -0.5538957696834953, 0,
    -0.5538957696834953, 0.8108049841353322, 0.18919501586466775, 0,
    0.5538957696834953, 0.18919501586466775, 0.8108049841353322, 0,
    0, 0, 0, 1
  ]
  t.deepEqual(obs, exp)
  rotation = [0, 0, 1, 0]

  rotation = [0.0, 0.0, 0.0, 1.57]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
  t.deepEqual(obs, exp)
  rotation = [0, 0, 1, 0]

  // COMBINATIONS
  scale = [0.91, 0.6, 0.3]
  translation = [0.8, -0.65, 0.5]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [0.91, 0, 0, 0, 0, 0.6, 0, 0, 0, 0, 0.3, 0, 0.8, -0.65, 0.5, 1]
  t.deepEqual(obs, exp)
  scale = [1, 1, 1]
  translation = [0, 0, 0]

  rotation = [0.0, 0.0, -1.0, 0.523599]
  translation = [-0.25, 0.75, 0.0]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [
    0.8660252915835662, -0.5000001943375613, 0, 0,
    0.5000001943375613, 0.8660252915835662, 0, 0,
    0, 0, 1, 0,
    -0.25, 0.75, 0, 1
  ]
  t.deepEqual(obs, exp)
  rotation = [0, 0, 1, 0]
  translation = [0, 0, 0]

  center = [-0.00303999, 0.898843, -0.091817]
  rotation = [0, 1, 0, 1.57079]
  translation = [0.00303999, -0.898843, 0.049247]
  obs = createTransform(center, rotation, scale, scaleOrientation, translation)
  exp = [
    0.000006326794896668469, 0, -0.9999999999799858, 0,
    0, 1, 0, 0,
    0.9999999999799858, 0, 0.000006326794896668469, 0,
    0.09181701923155557, -0.898843, -0.04560940909261213, 1
  ]
  t.deepEqual(obs, exp)
  center = [0, 0, 0]
  rotation = [0, 0, 1, 0]
  translation = [0, 0, 0]
})
