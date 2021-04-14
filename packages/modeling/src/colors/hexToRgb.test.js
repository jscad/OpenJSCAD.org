const test = require('ava')

const { hexToRgb } = require('./index')

test('hexToRgb (RGB notations)', (t) => {
  let obs = hexToRgb('#ff007f')
  let exp = [1, 0, 0.4980392156862745]

  t.deepEqual(obs, exp)

  obs = hexToRgb('#FF007F')
  exp = [1, 0, 0.4980392156862745]

  t.deepEqual(obs, exp)

  obs = hexToRgb('FF007F')
  exp = [1, 0, 0.4980392156862745]

  t.deepEqual(obs, exp)
})

test('hexToRgb (RGBA notations)', (t) => {
  let obs = hexToRgb('#ff007f01')
  let exp = [1, 0, 0.4980392156862745, 0.00392156862745098]

  t.deepEqual(obs, exp)

  obs = hexToRgb('#FF007F01')
  exp = [1, 0, 0.4980392156862745, 0.00392156862745098]

  t.deepEqual(obs, exp)

  obs = hexToRgb('FF007F01')
  exp = [1, 0, 0.4980392156862745, 0.00392156862745098]

  t.deepEqual(obs, exp)
})
