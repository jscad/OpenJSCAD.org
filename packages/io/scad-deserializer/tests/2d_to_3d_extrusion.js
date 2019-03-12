const check = require('./helpers').check
const filedir = '2d_to_3d_extrusion/'

exports['test Linear Extrude'] = function () {
  check(filedir, 'linearExtrudeEx1')
  check(filedir, 'linearExtrudeEx2')
  check(filedir, 'linearExtrudeEx3')
  check(filedir, 'linearExtrudeEx4')
  check(filedir, 'linearExtrudeEx5')
  check(filedir, 'linearExtrudeEx6')
  check(filedir, 'linearExtrudeEx7')
}

if (module === require.main) require('test').run(exports)
