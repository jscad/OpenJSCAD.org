const check = require('./helpers').check
const filedir = 'submodule_tests/'

exports['test transformed submodule'] = function () {
  check(filedir, 'transformedSubmoduleEx1')
}

exports['test transformed submodule with extra line'] = function () {
  check(filedir, 'transformedSubmoduleEx2')
}

exports['test transformed submodule with color mod'] = function () {
  check(filedir, 'transformedSubmoduleEx3')
}

exports['test nested submodules'] = function () {
  check(filedir, 'nestedSubmoduleEx1')
  check(filedir, 'nestedSubmoduleEx2')
}

if (module === require.main) require('test').run(exports)
