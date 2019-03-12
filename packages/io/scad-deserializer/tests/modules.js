const check = require('./helpers').check

const filedir = 'modules/'

exports['test modules'] = function () {
  check(filedir, 'modulesEx1')
}

exports['test modules child'] = function () {
  check(filedir, 'modulesChildEx1')
}

exports['test modules children'] = function () {
  check(filedir, 'modulesChildrenEx1')
}

exports['test modules parameters'] = function () {
  check(filedir, 'modulesParametersEx1')
}

if (module === require.main) require('test').run(exports)
