const test = require('ava')

const deserializer = require('../src/index.js')

// deserializer

// ################################

test('deserialize issue 885', (t) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="5.791015625" height="11.71875">
    <path d="M1.84-3.17L0.53-3.48L0.97-7.11L5.12-7.11L5.12-5.83L2.30-5.83L2.14-4.42Q2.32-4.52 2.60-4.60Q2.89-4.68 3.16-4.68L3.16-4.68Q4.22-4.68 4.79-4.05Q5.36-3.42 5.36-2.29L5.36-2.29Q5.36-1.61 5.06-1.05Q4.75-0.50 4.20-0.20Q3.65 0.10 2.90 0.10L2.90 0.10Q2.23 0.10 1.64-0.18Q1.05-0.45 0.72-0.94Q0.39-1.42 0.40-2.02L0.40-2.02L2.05-2.02Q2.07-1.63 2.29-1.40Q2.52-1.17 2.89-1.17L2.89-1.17Q3.72-1.17 3.72-2.40L3.72-2.40Q3.72-3.54 2.70-3.54L2.70-3.54Q2.12-3.54 1.84-3.17L1.84-3.17Z"/>
  </svg>`

  t.throws(() => {
    deserializer.deserialize({ output: 'geometry' }, svg)
  }, { instanceOf: Error }, 'Malformed svg path at 2:445. Path closed itself with command #29: "Q2.12 -3.54 1.84 -3.17". to avoid this error use pathSelfClosed:\'split\' or pathSelfClosed:\'trim\' option')

  let shapes = deserializer.deserialize({ output: 'geometry', pathSelfClosed: 'split' }, svg)
  t.is(shapes.length, 2)

  shapes = deserializer.deserialize({ output: 'geometry', pathSelfClosed: 'trim' }, svg)
  t.is(shapes.length, 1)
})
