const assert = require('assert')
const check = require('./helpers').check
const filedir = 'conditional_and_iterator_functions/'

exports['test for loop'] = function () {
  check(filedir, 'forLoopEx1')
  check(filedir, 'forLoopEx2a')
  check(filedir, 'forLoopEx2b')
  check(filedir, 'forLoopEx3')
  check(filedir, 'forLoopEx4')
}

exports['test intersection_for loop'] = function () {
  check(filedir, 'intersectionForLoopEx1')
  check(filedir, 'intersectionForLoopEx2')
}

exports['test if statement'] = function () {
  check(filedir, 'ifStatementEx1')
}

/*
exports['test assign statement'] = function () {
  assert.todo('todo ')
}*/

if (module === require.main) require('test').run(exports)
