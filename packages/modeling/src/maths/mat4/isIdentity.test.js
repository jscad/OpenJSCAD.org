import test from 'ava'

import { isIdentity, create, fromTranslation } from './index.js'

test('mat4: isIdentity() should return correct values', (t) => {
  const identity = create() // identity matrix
  t.true(isIdentity(identity))

  const notidentity = fromTranslation(create(), [5, 5, 5])
  t.false(isIdentity(notidentity))
})
