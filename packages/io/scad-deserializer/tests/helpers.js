const fs = require('fs')
const path = require('path')
const assert = require('assert')
const parser = require(path.join(__dirname, '../src/parserWrapper'))

function check (filedir, testFileName) {
  var test = fs.readFileSync(path.join(__dirname, `${filedir}${testFileName}.scad`), 'utf8')
  var expected = fs.readFileSync(path.join(__dirname, `${filedir}${testFileName}.jscad`), 'utf8').replace(/\n/g, '')
  var actual = parser.parse(test).replace(/\n/g, '')
  assert.equal(actual, expected)
}

module.exports = {check}
