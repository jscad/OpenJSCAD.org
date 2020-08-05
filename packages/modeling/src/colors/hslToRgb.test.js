const test = require('ava')

const { hslToRgb } = require('./index')

test('hslToRgb (HSL values)', (t) => {
  let obs = hslToRgb([0, 1, 0])
  let exp = [0, 0, 0]

  t.deepEqual(obs, exp)

  obs = hslToRgb([0.9166666666666666, 1, 0.5])
  exp = [1, 0, 0.5000000000000002]

  t.deepEqual(obs, exp)

  obs = hslToRgb(0.9166666666666666, 0, 0.5)
  exp = [0.5, 0.5, 0.5]

  t.deepEqual(obs, exp)
})

test('hslToRgb (HSLA values)', (t) => {
  let obs = hslToRgb([0, 1, 0, 1])
  let exp = [0, 0, 0, 1]

  t.deepEqual(obs, exp)

  obs = hslToRgb([0.9166666666666666, 1, 0.5, 1])
  exp = [1, 0, 0.5000000000000002, 1]

  t.deepEqual(obs, exp)

  obs = hslToRgb(0.9166666666666666, 0, 0.5, 0.5)
  exp = [0.5, 0.5, 0.5, 0.5]

  t.deepEqual(obs, exp)
})
