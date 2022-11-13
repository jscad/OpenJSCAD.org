import test from 'ava'

import { hsvToRgb } from './index.js'

test('hsvToRgb (HSV values)', (t) => {
  let obs = hsvToRgb([0, 0.2, 0])
  let exp = [0, 0, 0]

  t.deepEqual(obs, exp)

  obs = hsvToRgb(0.9166666666666666, 1, 1)
  exp = [1, 0, 0.5]

  t.deepEqual(obs, exp)
})

test('hsvToRgb (HSVA values)', (t) => {
  let obs = hsvToRgb([0, 0.2, 0, 1])
  let exp = [0, 0, 0, 1]

  t.deepEqual(obs, exp)

  obs = hsvToRgb(0.9166666666666666, 1, 1, 0.5)
  exp = [1, 0, 0.5, 0.5]

  t.deepEqual(obs, exp)
})
