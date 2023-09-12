import test from 'ava'

import { vectorText } from './index.js'

test('vectorText (empty string)', (t) => {
  const obs = vectorText({}, '')
  t.is(obs.length, 0)
})

test('vectorText (text)', (t) => {
  const obs = vectorText({}, 'O I') // one char with one closed path, one char with one open path
  t.is(obs.length, 1)

  const vtext = obs[0]
  t.is(vtext.width, 46)
  t.is(vtext.height, 14)
  t.is(vtext.chars.length, 2)

  // 'O'
  let vchar = vtext.chars[0]
  t.is(vchar.width, 22)
  t.is(vchar.height, 14)
  t.is(vchar.paths.length, 1)
  t.is(vchar.paths[0].isClosed, true)
  t.is(vchar.paths[0].points.length, 20)

  t.deepEqual(vchar.paths[0].points[0], [9, 21])

  // 'I'
  vchar = vtext.chars[1]
  t.is(vchar.width, 8)
  t.is(vchar.height, 14)
  t.is(vchar.paths.length, 1)
  t.is(vchar.paths[0].isClosed, false)

  // NOTE: ' ' in text is not in list of vchars, but produces an xOffset
  t.deepEqual(vchar.paths[0].points[0], [26 + 16, 21])
})

test('vectorText (multi-line-text)', (t) => {
  // NOTE: control line spacing to verify '\n' characters are working
  const obs = vectorText({ lineSpacing: 1 }, '\nROCKS!\n\nOpen\nJSCAD\nROCKS!\n')
  // only those lines with characters will be returned
  t.is(obs.length, 4)

  // ROCKS!
  let vtext = obs[0]
  t.is(vtext.width, 115)
  t.is(vtext.height, 14)
  t.is(vtext.chars.length, 6)

  let vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [4, 7])

  // Open
  vtext = obs[1]
  t.is(vtext.width, 78)
  t.is(vtext.height, 14)
  t.is(vtext.chars.length, 4)

  vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [9, -21])

  // JSCAD
  vtext = obs[2]
  t.is(vtext.width, 96)
  t.is(vtext.height, 14)
  t.is(vtext.chars.length, 5)

  vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [12, -35])

  // ROCKS!
  vtext = obs[3]
  t.is(vtext.width, 115)
  t.is(vtext.height, 14)
  t.is(vtext.chars.length, 6)

  vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [4, -49])
})

test('vectorText ({ yOffset }, text)', (t) => {
  const expectedTransform = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs = vectorText({ yOffset: 20 }, 'y')
  t.is(obs.length, 1)

  const vtext = obs[0]
  t.is(vtext.width, 16)
  t.is(vtext.height, 14)
  t.is(vtext.chars.length, 1)

  // 'y'
  const vchar = vtext.chars[0]
  t.is(vchar.width, 16)
  t.is(vchar.height, 14)
  t.is(vchar.paths.length, 2)
  t.is(vchar.paths[0].points.length, 2)
  t.is(vchar.paths[1].points.length, 6)

  t.deepEqual(vchar.paths[0].points[0], [2, 34]) // Y = 14 + 20 = 34
  t.deepEqual(vchar.paths[0].transforms, expectedTransform)
})

test('vectorText ({ xOffset }, text)', (t) => {
  const expectedTransform = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs = vectorText({ xOffset: 20 }, 'y')
  t.is(obs.length, 1)

  const vtext = obs[0]
  t.is(vtext.width, 16)
  t.is(vtext.height, 14)
  t.is(vtext.chars.length, 1)

  // 'y'
  const vchar = vtext.chars[0]
  t.is(vchar.width, 16)
  t.is(vchar.height, 14)
  t.is(vchar.paths.length, 2)
  t.is(vchar.paths[0].points.length, 2)
  t.is(vchar.paths[1].points.length, 6)

  t.deepEqual(vchar.paths[0].points[0], [22, 14]) // X = 2 + 20 = 22
  t.deepEqual(vchar.paths[0].transforms, expectedTransform)
})

test('vectorText ({ letterSpacing }, text)', (t) => {
  const obs = vectorText({ letterSpacing: 0.5 }, 'JSCAD')
  t.is(obs.length, 1)

  const vtext = obs[0]
  t.is(vtext.height, 14)
  t.is(vtext.chars.length, 5)

  // 'J'
  let vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [12, 21])

  // 'S'
  vchar = vtext.chars[1]
  t.deepEqual(vchar.paths[0].points[0], [40, 18]) // X = 33 + (1 * 14 * 0.5)

  // 'C'
  vchar = vtext.chars[2]
  t.deepEqual(vchar.paths[0].points[0], [68, 16]) // X = 54 + (2 * 14 * 0.5)

  // 'A'
  vchar = vtext.chars[3]
  t.deepEqual(vchar.paths[0].points[0], [87, 21]) // X = 66 + (3 * 14 * 0.5)

  // 'D'
  vchar = vtext.chars[4]
  t.deepEqual(vchar.paths[0].points[0], [107, 21]) // X = 79 + (4 * 14 * 0.5)
})

test('vectorText ({ align: center }, text)', (t) => {
  const expectedTransformA = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    18.5, 0, 0, 1
  ]
  const expectedTransformAB = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    9, 0, 0, 1
  ]
  const expectedTransformABC = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs = vectorText({ align: 'center' }, 'a\nab\nabc')
  t.is(obs.length, 3)

  // 'a'
  let vtext = obs[0]
  t.is(vtext.chars.length, 1)

  let vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [15, 14])
  t.deepEqual(vchar.paths[0].transforms, expectedTransformA)

  // 'a b'
  vtext = obs[1]
  t.is(vtext.chars.length, 2)

  vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [15, -16])
  t.deepEqual(vchar.paths[0].transforms, expectedTransformAB)

  // 'a b c'
  vtext = obs[2]
  t.is(vtext.chars.length, 3)

  vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [15, -46])
  t.deepEqual(vchar.paths[0].transforms, expectedTransformABC)
})

test('vectorText ({ align: right }, text)', (t) => {
  const expectedTransformA = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    37, 0, 0, 1
  ]
  const expectedTransformAB = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    18, 0, 0, 1
  ]
  const expectedTransformABC = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]

  const obs = vectorText({ align: 'right' }, 'a\nab\nabc')
  t.is(obs.length, 3)

  // 'a'
  let vtext = obs[0]
  t.is(vtext.chars.length, 1)

  let vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [15, 14])
  t.deepEqual(vchar.paths[0].transforms, expectedTransformA)

  // 'a b'
  vtext = obs[1]
  t.is(vtext.chars.length, 2)

  vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [15, -16])
  t.deepEqual(vchar.paths[0].transforms, expectedTransformAB)

  // 'a b c'
  vtext = obs[2]
  t.is(vtext.chars.length, 3)

  vchar = vtext.chars[0]
  t.deepEqual(vchar.paths[0].points[0], [15, -46])
  t.deepEqual(vchar.paths[0].transforms, expectedTransformABC)
})

test('vectorText required options', (t) => {
  t.throws(() => vectorText(), { message: 'text must be a string' })
  t.throws(() => vectorText({}), { message: 'text must be a string' })
})
