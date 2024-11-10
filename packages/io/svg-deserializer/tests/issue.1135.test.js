const test = require('ava')

const deserializer = require('../src/index.js')

test('deserialize issue 885 do not fail on close at the end', (t) => {
  const svg = '<svg><g><path d="M0 0 L10 10L10 0L0 0" id="path4544" /></g></svg>'

  const shapes = deserializer.deserialize({ output: 'geometry', pathSelfClosed: 'error' }, svg)
  t.is(shapes.length, 1)
})
