const test = require('ava')

const { rgbToHsv } = require('./index')

test('rgbToHsv', (t) => {
  let obs = rgbToHsv([1, 0, 0.5])
  let exp = [0.9166666666666666, 1, 1]

  t.deepEqual(obs, exp)

  obs = rgbToHsv(0.5, 0.5, 0.5)
  exp = [0, 0, 0.5]

  t.deepEqual(obs, exp)

  obs = rgbToHsv([0.8, 0.7, 0.6])
  exp = [0.08333333333333329, 0.25000000000000006, 0.8]

  t.deepEqual(obs, exp)

  obs = rgbToHsv([0.7, 0.8, 0.6])
  exp = [0.25000000000000006, 0.25000000000000006, 0.8]

  t.deepEqual(obs, exp)

  obs = rgbToHsv([0.6, 0.7, 0.8])
  exp = [0.5833333333333334, 0.25000000000000006, 0.8]

  t.deepEqual(obs, exp)

  obs = rgbToHsv(0.6, 0.7, 0.8, 0.5)
  exp = [0.5833333333333334, 0.25000000000000006, 0.8, 0.5]

  t.deepEqual(obs, exp)

  obs = rgbToHsv([0, 0, 0, 0.5])
  exp = [0, 0, 0, 0.5]

  t.deepEqual(obs, exp)
})
