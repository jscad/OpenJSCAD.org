exports.test1 = require('./2d_to_3d_extrusion')
exports.test2 = require('./conditional_and_iterator_functions')
exports.test5 = require('./modules')
exports.test6 = require('./primitive_solids')
exports.test7 = require('./submodule_tests')
exports.test8 = require('./transformations')
exports.test9 = require('./2d_primitives')

if (require.main === module) {
  require('test').run(exports)
}
