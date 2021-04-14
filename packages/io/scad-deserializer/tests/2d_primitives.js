const check = require('./helpers').check
const filedir = '2d_primitives/'

exports['test Square'] = function () {
  check(filedir, 'squareEx1')
}
if (module === require.main) require('test').run(exports)
