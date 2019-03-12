const Parser = require('jison').Parser
const fs = require('fs')
const path = require('path')

const grammar = fs.readFileSync('./openscad-parser.jison', 'utf8')
const parser = new Parser(grammar, {type: 'LALR'})

// generate source, ready to be written to disk
let parserSource = parser.generate()

// we add our extra variables to the base parser
parserSource = `const ext = require('./openscad-parser-ext')
const ArgContainer = require('./ArgContainer')
const ArgsContainer = require('./ArgsContainer')
const Expression = require('./Expression')
const ModuleInstantiation = require('./ModuleInstantiation')
const IfElseModuleInstantiation = require('./IfElseModuleInstantiation')
${parserSource}`
fs.writeFileSync(path.join(__dirname, 'parserCJS.js'), parserSource)

// ext, ArgContainer, ArgsContainer, Expression, ModuleInstantiation, IfElseModuleInstantiation
// openscad-parser-ext", "ArgContainer", "ArgsContainer", "Expression", "ModuleInstantiation", "IfElseModuleInstantiation
