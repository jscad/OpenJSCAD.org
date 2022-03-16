'use strict'
const test = require('ava')

const { getParameterDefinitionsFromSource, parseOne, parseComment, parseDef } = require('./getParameterDefinitionsFromSource.js')

const sampleParams = [
  { name: 'width', caption: 'Width', type: 'int', initial: 145 },
  { name: 'height', caption: 'height', type: 'int', initial: 100 },
  { name: 'division', caption: 'Number of rows (== columns)', type: 'int', initial: 4 },
  { name: 'bottomPieceHeight', caption: 'Water space(mm)', type: 'int', initial: 20 },

  { name: 'group1', caption: 'Wall thickness', type: 'group' },
  { name: 'thickOut', caption: 'Vertical outside', type: 'number', initial: 0.8 },
  { name: 'thickIn', caption: 'Vertical inside', type: 'number', initial: 0.8 },
  { name: 'thickBottom', caption: 'Bottom', type: 'number', initial: 0.8 }
]

const sampleScript = `function main({// @jscad-params
  width=145, // Width
  height=100,
  division=4,// Number of rows (== columns)
  bottomPieceHeight=20,// Water space(mm)

/* Wall thickness {name:'group1'} */
  thickOut=0.8, //Vertical outside
  
  thickIn=0.8,// Vertical inside
  thickBottom=0.8,//Bottom
}){`

const sampleScript2 = `function main({// @jscad-params
  width=145,            // Width 
  height=100,           // height
  division=4,           // Number of rows (== columns)
  bottomPieceHeight=20, // Water space(mm)

// Wall thickness {name:'group1'}
  thickOut=0.8,    // Vertical outside
  thickIn=0.8,     // Vertical inside
  thickBottom=0.8, // Bottom
})`

const inputTest = `const jscad = require('@jscad...');

var x = 1

${sampleScript}
  var a = 1

  return circle()
}
`

test('multiple params', (t) => {
  t.deepEqual(getParameterDefinitionsFromSource(inputTest), sampleParams)
})

test('CURRENT multiple params', (t) => {
  t.deepEqual(getParameterDefinitionsFromSource(sampleScript2), sampleParams)
})

test('line comment', (t) => {
  t.deepEqual(parseComment('// Width '), { caption: 'Width' })
})

test('block comment', (t) => {
  t.deepEqual(parseComment('/* Width */'), { caption: 'Width' })
})

test('comment with data', (t) => {
  t.deepEqual(parseComment('/* Password {type:"password"}*/'), { caption: 'Password', options: { type: 'password' } })
})

test('param without init value', (t) => {
  t.deepEqual(parseDef('width'), { name: 'width', type: 'text' })
})

test('param int', (t) => {
  t.deepEqual(parseDef('age=1,'), { name: 'age', type: 'int', initial: 1 })
})

test('param float', (t) => {
  t.deepEqual(parseDef('angle=1.0,'), { name: 'angle', type: 'number', initial: 1 })
})

test('proeprty float', (t) => {
  t.deepEqual(parseDef('angle:1.0,'), { name: 'angle', type: 'number', initial: 1 })
})

test('param checkbox', (t) => {
  t.deepEqual(parseDef('bigorsmall=true,'), { name: 'bigorsmall', type: 'checkbox', checked: true })
  t.deepEqual(parseDef('bigorsmall=false,'), { name: 'bigorsmall', type: 'checkbox', checked: false })
})

test('param text', (t) => {
  t.deepEqual(parseDef('name,'), { name: 'name', type: 'text' })
})

const testBothDir = function (t, line1, line2, def) {
  t.deepEqual(parseOne(line1, line2), def)
}

test('param checkbox with initial value', (t) => {
  testBothDir(t,
    '// Big? {type:"checkbox"}',
    'bigorsmall=20,',
    { name: 'bigorsmall', type: 'checkbox', checked: true, initial: 20, caption: 'Big?' }
  )
})

test('param color', (t) => {
  testBothDir(t,
    '// Color? {type:"color"}',
    'color=\'#FFB431\'',
    { name: 'color', type: 'color', initial: '#FFB431', caption: 'Color?' }
  )
})

test('param date', (t) => {
  testBothDir(t,
    '// Birthday? {type:"date"}',
    'birthday',
    { name: 'birthday', type: 'date', caption: 'Birthday?' }
  )
})

test('param email', (t) => {
  testBothDir(t,
    '// Email Address? {type:"email"}',
    'address',
    { name: 'address', type: 'email', caption: 'Email Address?' }
  )
})

test('param password', (t) => {
  testBothDir(t,
    '// Secret? {type:"password"}',
    'password',
    { name: 'password', type: 'password', caption: 'Secret?' }
  )
})

test('param slider', (t) => {
  testBothDir(t,
    '// How many? {type:"slider", min:2, max:10}',
    'count',
    { name: 'count', type: 'slider', min: 2, max: 10, caption: 'How many?' }
  )
})

test('param slider2', (t) => {
  testBothDir(t,
    '// How many? {type:"slider", min:2, max:10, step:2}',
    'count',
    { name: 'count', type: 'slider', min: 2, max: 10, step: 2, caption: 'How many?' }
  )
})

test('param url', (t) => {
  testBothDir(t,
    '// Web page URL? {type:"url"}',
    'webpage',
    { name: 'webpage', type: 'url', caption: 'Web page URL?' }
  )
})

test('param choice', (t) => {
  testBothDir(t,
    '// Rounded edges {type:\'choice\', values: [0, 1], captions: [\'No\', \'Yes (slow!)\']}',
    'rounded=0',
    { name: 'rounded', type: 'choice', caption: 'Rounded edges', values: [0, 1], captions: ['No', 'Yes (slow!)'], initial: 0 }
  )
})

const sampleParamsWithHints = [
  { name: 'width', caption: 'Width', type: 'int', initial: 145, hint: 'Width of the complete model\nIncluding other stuff' },
  { name: 'height', caption: 'height', type: 'int', initial: 100, hint: 'Height of the complete model' },

  { name: '_group_1', caption: 'Wall thickness :group1', type: 'group', hint: 'Extra description of the group so group name can stay short', initial: 'closed' },
  { name: 'thickOut', caption: 'Vertical outside', type: 'number', initial: 0.8 }
]

const sampleScriptHints = `function main({// @jscad-params
  width=145,    // Width 
                // Width of the complete model
                // Including other stuff  

  height=100,   // height
                // Height of the complete model

// > Wall thickness :group1
// Extra description of the group so group name can stay short
  thickOut=0.8,    // Vertical outside
})`

const inputTestHints = `const jscad = require('@jscad...');

var x = 1

${sampleScriptHints}
  var a = 1

  return circle()
}
`

test('extra hints', (t) => {
  t.deepEqual(getParameterDefinitionsFromSource(inputTestHints), sampleParamsWithHints)
})

const sampleParams2 = [{ name: 'width', caption: 'width', type: 'int', initial: 14 }]

test('last param brackets', (t) => {
  t.deepEqual(getParameterDefinitionsFromSource(`function main({//@jscad-params
  width=14})`), sampleParams2)
})

test('multiline error', (t) => {
  t.throws(() => getParameterDefinitionsFromSource(`function main({//@jscad-params
  /*
  width=14})`), { instanceOf: EvalError, message: 'Multi-line comments not supported in parsed parameter definitions, line:2' })
})

test('single line /* ...*/ ok', (t) => {
  t.deepEqual(getParameterDefinitionsFromSource(`function main({//@jscad-params
  /* group */
  width=14})`), [{ type: 'group', caption: 'group', name: '_group_1' }, ...sampleParams2])
})
