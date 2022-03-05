const test = require('ava')

const { isIdentity, create, fromTranslation } = require('./index')

test('mat4: isIdentity() should return correct values', (t) => {
  const identity = create() // identity matrix
  t.true(isIdentity(identity))

  const notidentity = fromTranslation(create(), [5, 5, 5])
  t.false(isIdentity(notidentity))
})
