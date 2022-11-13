import test from 'ava'

import { TAU } from '../constants.js'

import { isOnlyTransformScale, create, fromTranslation, fromTaitBryanRotation, fromScaling, invert, multiply } from './index.js'

test('mat4: isOnlyTransformScale() should return true for right angles', (t) => {
  let someRotation = fromTaitBryanRotation(create(), TAU / 2, 0, 0)
  t.true(isOnlyTransformScale(someRotation))
  t.true(isOnlyTransformScale(invert(create(), someRotation)))

  someRotation = fromTaitBryanRotation(create(), 0, 0, 0)
  t.true(isOnlyTransformScale(someRotation))
})

test('mat4: isOnlyTransformScale() should return correct values', (t) => {
  const identity = create() // identity matrix
  t.true(isOnlyTransformScale(identity))

  const someTranslation = fromTranslation(create(), [5, 5, 5])
  t.true(isOnlyTransformScale(someTranslation))

  const someScaling = fromScaling(create(), [5, 5, 5])
  t.true(isOnlyTransformScale(someScaling))
  t.true(isOnlyTransformScale(invert(create(), someScaling)))

  const combined = multiply(create(), someTranslation, someScaling)
  t.true(isOnlyTransformScale(combined))
})
