const test = require('ava')

const { colorNameToRgb } = require('./index')

test('colorNameToRgb', (t) => {
  let obs = colorNameToRgb('bad')

  t.is(obs, undefined)

  obs = colorNameToRgb('lightblue')
  const exp = [0.6784313725490196, 0.8470588235294118, 0.9019607843137255]

  t.deepEqual(obs, exp)
})
