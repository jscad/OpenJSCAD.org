const makeJscad = require('./src/index')

const options = {}

const rootEl = document.createElement('div')
document.body.appendChild(rootEl)

console.log('creating jscad instances')

//
const el1 = document.createElement('div')
el1.className = 'jscad1'
const jscadInst1 = makeJscad(el1, options)
rootEl.appendChild(el1)

//
const el2 = document.createElement('div')
el2.className = 'jscad2'
const jscadInst2 = makeJscad(el2, options)
rootEl.appendChild(el2)
