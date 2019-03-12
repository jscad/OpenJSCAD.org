const assert = require('assert')
const check = require('./helpers').check
const filedir = 'transformations/'

exports['test scale'] = function () {
  check(filedir, 'scaleEx1')
  check(filedir, 'scaleEx2')
}

exports['test rotate'] = function () {
  check(filedir, 'rotateEx1')
  check(filedir, 'rotateEx2')
}

exports['test translate'] = function () {
  check(filedir, 'translateEx1')
}

exports['test mirror'] = function () {
  check(filedir, 'mirrorEx1')
}

exports['test multmatrix'] = function () {
  check(filedir, 'multmatrixEx1')
  check(filedir, 'multmatrixEx2')
}

exports['test color'] = function () {
  check(filedir, 'colorEx1')
  check(filedir, 'colorEx1')
}

/*exports['test minkowski'] = function () {
  // todo
  //assert.ok(false)
}

exports['test hull'] = function () {
  // todo
  //assert.ok(false)
}*/

if (module === require.main) require('test').run(exports)
