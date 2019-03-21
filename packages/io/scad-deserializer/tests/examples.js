const fs = require('fs')
const assert = require('assert')
const parser = require('../src/parser')

function check (testFileName) {
  var test = fs.readFileSync('examples/' + testFileName + '.scad', 'utf8')
  var expected = fs.readFileSync('examples/' + testFileName + '.jscad', 'utf8').replace(/\n/g, '')
  var actual = parser.parse(test).lines.join('').replace(/\n/g, '')
  // assert.equal(actual, expected, console.log("\nExpected:\n" + expected + "\n\nActual:\n" + actual + "\n"))
  assert.equal(actual, expected)
}

exports['test example001'] = function () { 	 check('example001'); }
exports['test example002'] = function () {    check('example002'); }
exports['test example003'] = function () {    check('example003'); }
exports['test example004'] = function () {    check('example004'); }
exports['test example005'] = function () {    check('example005'); }
exports['test example006'] = function () {    check('example006'); }
// exports["test example007"] = function() {    check("example007"); }
// exports["test example008"] = function() {    check("example008"); }
// exports["test example009"] = function() {    check("example009"); }
// exports["test example010"] = function() {    check("example010"); }
exports['test example011'] = function () {    check('example011'); }
// exports["test example012"] = function() {    check("example012"); }
// exports["test example013"] = function() {    check("example013"); }
exports['test example014'] = function () {    check('example014'); }
// exports["test example015"] = function() {    check("example015"); }
// exports["test example016"] = function() {    check("example016"); }
// exports["test example017"] = function() {    check("example017"); }
exports['test example018'] = function () {    check('example018'); }
exports['test example019'] = function () {    check('example019'); }
// exports["test example020"] = function() {    check("example020"); }
// exports["test example021"] = function() {    check("example021"); }
// exports["test example022"] = function() {    check("example022"); }
// exports["test example023"] = function() {    check("example023"); }

if (module === require.main) require('test').run(exports)
