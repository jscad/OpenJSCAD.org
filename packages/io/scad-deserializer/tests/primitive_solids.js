const check = require('./helpers').check
const filedir = 'primitive_solids/'

exports['test cube'] = function () {
  check(filedir, 'cubeEx1')
  check(filedir, 'cubeEx2')
}

exports['test sphere'] = function () {
  check(filedir, 'sphereEx1')
  check(filedir, 'sphereEx2')
}

exports['test cylinder'] = function () {
  check(filedir, 'cylinderEx1')
  check(filedir, 'cylinderEx2')
  check(filedir, 'cylinderEx3')
  check(filedir, 'cylinderEx5')
}

exports['test cylinder additional parameters'] = function () {
  check(filedir, 'cylinderEx4')
}

exports['test polyhedron'] = function () {
  check(filedir, 'polyhedronEx1')
  check(filedir, 'polyhedronEx2')
}

if (module === require.main) require('test').run(exports)
